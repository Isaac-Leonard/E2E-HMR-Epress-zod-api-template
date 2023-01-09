import { Linter } from "eslint";
const config: Linter.Config = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
    "prettier",
    "plugin:import/recommended",
  ],
  env: { node: true },
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {},
    project: "./tsconfig.json",
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    "@typescript-eslint/explicit-function-return-type": "off",
    "import/prefer-default-export": "off",
    "import/extensions": "off",
    "no-await-in-loop": "off",
    "no-plusplus": "off",
    "no-restricted-syntax": "off",
    "prefer-destructuring": "off",
    "@typescript-eslint/no-loop-func": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/ban-types": "off",
    "no-continue": "off",
    "max-classes-per-file": "off",
    "no-console": "off",
  },
  settings: {},
};
export default config;
