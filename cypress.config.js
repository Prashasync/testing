const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement event listeners if needed
    },
    baseUrl: 'http://172.31.29.21:3000', // Change as per your app
    supportFile: false, // Ensure Cypress doesn't fail due to missing support file
  },
});

