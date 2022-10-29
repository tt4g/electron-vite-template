module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript", // eslint-plugin-import dependency when parsing Typescript.
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    // Use React 17 new JSX syntax.
    // See: https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
    "react/jsx-uses-react": ["off"],
    "react/react-in-jsx-scope": ["off"],
    "import/order": [
      "ERROR",
      { alphabetize: { order: "asc", caseInsensitive: true } },
    ],
    // eslint-import-resolver-typescript
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: ["."],
      },
    },
  },
  overrides: [
    {
      files: ["**/*.tsx"],
      rules: {
        "react/prop-types": "off",
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
};
