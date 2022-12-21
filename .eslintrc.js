module.exports = {
  root: true,
  extends: ["plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
  },
  plugins: [
    "react",
    "react-native",
    "@typescript-eslint",
    "deprecation",
    "react-hooks",
  ],
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
    "block-scoped-var": "warn",
    "eol-last": ["warn", "always"],

    // TS
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/no-non-null-assertion": "off",
    "deprecation/deprecation": "warn",

    // Hooks
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        additionalHooks: "useLoader",
      },
    ],

    // JSX
    "react/jsx-curly-brace-presence": ["warn", { props: "always" }],
    "react/jsx-key": [
      process.env.NODE_ENV === "production" ? "error" : "warn",
      { checkFragmentShorthand: true },
    ],
    "react/jsx-no-target-blank": [
      process.env.NODE_ENV === "production" ? "error" : "warn",
      { enforceDynamicLinks: "always", warnOnSpreadAttributes: true },
    ],
    "react/jsx-sort-props": [
      "warn",
      { shorthandLast: true, reservedFirst: true },
    ],
  },
};
