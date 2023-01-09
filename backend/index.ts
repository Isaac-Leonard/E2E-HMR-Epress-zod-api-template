import fs from "fs";
import { webpackConfig } from "./webpack-config";
import { webpack } from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import hotMiddleware from "webpack-hot-middleware";
import { port } from "./env";
import { logger } from "./logger";
import * as routes from "./routes";
import express from "express";
import { attachRouting, Client } from "express-zod-api";
import { AppConfig, CommonConfig } from "express-zod-api/dist/config-type";

let compiler = webpack(webpackConfig);

const createServer = () => {
  const app = express();
  const config: AppConfig & CommonConfig = {
    app,
    cors: false,
    logger,
    startupLogo: false,
  };
  const routing = {
    api: routes,
  };

  const { notFoundHandler } = attachRouting(config, routing);
  app.use("/api", notFoundHandler); // optional

  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  app.use(webpackDevMiddleware(compiler));
  app.use(
    hotMiddleware(compiler, {
      log: console.log.bind(console),
      heartbeat: 10,
    })
  );

  return app.listen(port, () => {
    logger.info("listening on port " + port);
  });
};

let server = createServer();

if (module.hot) {
  module.hot.accept("./routes", () => {
    //Update frontend code
    fs.writeFileSync(
      "./frontend/client.ts",
      new Client({ api: routes }).print(),
      "utf-8"
    );
    // Reset app state
    server.close();
    server = createServer();
  });

  module.hot.accept("./webpack-config.ts", () => {
    compiler = webpack(webpackConfig);
    server.close();
    server = createServer();
  });
}
