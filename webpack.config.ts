import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import webpackNodeExternals from "webpack-node-externals";
import {} from "webpack-dev-server";
import EslintPlugin from "eslint-webpack-plugin";
import webpack from "webpack";
import eslintrc from "./eslint.webpack";
import path from "path";

const config: webpack.Configuration = {
  target: "node",
  resolve: { extensions: [".ts", ".js"] },
  mode: "development",
  externalsPresets: { node: true },
  externals: [
    webpackNodeExternals({
      allowlist: [
        "webpack/hot/dev-server.js?hot=true",
        "webpack/hot/poll.js?1000",
      ],
    }),
  ],
  // TODO: This should be modified as cli scripts will be ignored
  entry: [
    "webpack/hot/dev-server.js?hot=true",
    "webpack/hot/poll.js?1000",
    "./backend/index.ts",
  ],
  devServer: {
    hot: false,
  },
  output: {
    clean: true,
    path: path.resolve("./dist"),
    filename: "app.[fullhash].js",
    chunkFilename: "[id].[chunkhash].js",
  },
  devtool: "source-map",
  infrastructureLogging: { level: "warn" },
  stats: "errors-warnings",
  module: {
    rules: [
      {
        test: /.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  plugins: [
    new EslintPlugin(eslintrc),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configOverwrite: { exclude: ["node_modules", "./frontend"] },
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {},
};

// Export so webpack can actually use it
export default config;
