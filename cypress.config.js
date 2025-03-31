const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:3000",  // Set your app's base URL
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",  // Ensure test files match this pattern
    supportFile: "cypress/support/e2e.js",  // Ensure this file exists
    video: true,  // Enable video recording of test runs
    screenshotsFolder: "cypress/screenshots",  // Store screenshots here
    videosFolder: "cypress/videos",  // Store videos here
    reporter: "junit",
    reporterOptions: {
      mochaFile: "tests/results/e2e-results.xml",  // Store test results
    },
  },
});
