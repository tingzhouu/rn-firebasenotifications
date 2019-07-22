module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb"
  ],
  "rules": {
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    ],
    "react/jsx-boolean-value": 0,
    "react/prefer-stateless-function": 0,
    "global-require": 0,
    "class-methods-use-this": 0,
    "linebreak-style": 0,
    "react/prop-types": 0,
    "arrow-body-style": 0,
    "max-len": [
      1,
      {
        "code": 100,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true
      }
    ],
    "no-bitwise": 0,
    "no-mixed-operators": 0,
    "no-return-assign": 0,
    "prefer-promise-reject-errors": "off"
  },
  "globals": {
    "fetch": true,
    "FormData": true
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": [
          "src",
          "node_modules"
        ]
      }
    }
  }
};