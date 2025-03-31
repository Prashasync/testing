const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement event listeners if needed
    },
    baseUrl: 'http://127.0.0.1:46489', // Change as per your app
    supportFile: false, // Ensure Cypress doesn't fail due to missing support file
  },
});

