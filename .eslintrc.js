module.exports = {
  "env": {
    "browser": true,
    "jest/globals": true,
    "cypress/globals": true,
  },
  "extends": ["airbnb"],
  "plugins": [
    "react", "jest", "cypress"
  ],
  "rules": {"import/no-extraneous-dependencies": ["error", { "devDependencies": true }]}
  };
