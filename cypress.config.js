module.exports = {
  e2e: {
    baseUrl: "http://127.0.0.1:3000",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",  // Ensure test files match this pattern
    supportFile: "cypress/support/e2e.js",
  },
};
