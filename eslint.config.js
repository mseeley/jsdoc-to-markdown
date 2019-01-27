// This file is consumed by eslint by way of .eslintrc.js.
module.exports = {
  root: true,

  extends: ["eslint:recommended", "plugin:prettier/recommended"],

  parserOptions: {
    ecmaVersion: 6,
    impliedStrict: true,
    sourceType: "script"
  },

  plugins: ["import", "prettier"],

  env: {
    commonjs: true,
    es6: true,
    node: true
  },

  rules: {
    "block-scoped-var": "error",
    "consistent-this": ["error", "self"],
    "dot-notation": "error",
    "eol-last": "error",
    eqeqeq: ["error", "smart"],
    "import/no-absolute-path": "error",
    "import/order": [
      "error",
      { groups: ["builtin", "internal", "parent", "sibling", "index"] }
    ],
    "import/no-unresolved": ["error", { commonjs: true }],
    "import/no-useless-path-segments": "error",
    "linebreak-style": ["error", "unix"],
    "no-alert": 0,
    "no-array-constructor": "error",
    "no-caller": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-global-assign": "error",
    "no-implicit-coercion": "error",
    "no-implied-eval": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-lonely-if": "error",
    "no-loop-func": "error",
    "no-multi-str": "error",
    "no-nested-ternary": "error",
    "no-new-func": "error",
    "no-new-object": "error",
    "no-new-wrappers": "error",
    "no-octal-escape": "error",
    "no-param-reassign": "error",
    "no-proto": "error",
    "no-return-assign": "error",
    "no-script-url": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-shadow": "error",
    "no-shadow-restricted-names": "error",
    "no-throw-literal": "error",
    "no-undef-init": "error",
    "no-unneeded-ternary": "error",
    "no-unused-vars": [
      "error",
      { vars: "all", args: "none", ignoreRestSiblings: true }
    ],
    "no-useless-call": "error",
    "no-useless-concat": "error",
    "no-void": "error",
    "one-var": ["error", "never"],
    "prefer-const": "error",
    "prettier/prettier": "error",
    radix: "error",
    yoda: "error"
  }
};
