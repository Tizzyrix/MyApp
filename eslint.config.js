// import globals from "globals";
// import pluginJs from "@eslint/js";
// import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
// import { fixupConfigRules } from "@eslint/compat";


// export default [
//   {files: ["**/*.{js,mjs,cjs,jsx}"]},
//   { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
//   {languageOptions: { globals: globals.browser }},
//   {rules: {"prefer-const": ["error"]}}
// ];

import noloops from 'eslint-plugin-no-loops'

export default [
  {
      plugins: {
        noloops
      },
      rules: {
          "noloops/no-loops": "warn"
      }
  },
  ...noloops
];