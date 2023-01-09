import { ESLint } from "eslint";
import ESLintWebpackPlugin from "eslint-webpack-plugin";
import eslintConfig from "./eslint";
const config: ESLintWebpackPlugin["options"] & ESLint.Options = {
  extensions: ["ts", "tsx"],
  overrideConfig: eslintConfig,
  fix: true,
};
export default config;
