const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement event listeners if needed
    },
    baseUrl: 'http://127.0.0.0:3000', // Change as per your app
    supportFile: false, // Ensure Cypress doesn't fail due to missing support file
  },
});

