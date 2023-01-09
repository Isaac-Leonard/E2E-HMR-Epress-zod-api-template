import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

import { Configuration, HotModuleReplacementPlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

export const webpackConfig: Configuration = {
  target: "web",
  resolve: { extensions: [".tsx", ".ts", ".js", ""] },
  mode: "development",
  entry: [
    "webpack-hot-middleware/client",
    "@pmmmwh/react-refresh-webpack-plugin/client/ReactRefreshEntry.js",
    "./frontend/index.tsx",
  ],
  output: {
    path: __dirname + "/public",
    filename: "static/js/bundle.js",
    chunkFilename: "static/js/[name].chunk.js",
    publicPath: "/",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-typescript",
              "@babel/preset-react",
            ],
            plugins: [
              "react-refresh/babel",
              [
                "@babel/plugin-transform-react-jsx",
                { pragma: "m", pragmaFrag: "'['", regenerator: true },
              ],
            ],
          },
        },
      },
    ],
  },
  infrastructureLogging: { level: "warn" },
  stats: "errors-warnings",
  watchOptions: {
    ignored: "/node_modules/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      scriptLoading: "blocking",
    }),
    new HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin({ overlay: false, forceEnable: true }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configOverwrite: { include: ["./frontend"] },
      },
    }),
  ],
  optimization: {},
};
