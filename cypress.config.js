const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}", // Check this path
    baseUrl: "http://127.0.0.1:3000",
  },
});
