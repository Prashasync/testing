module.exports = {
  e2e: {
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}", // Ensure this matches actual file locations
    baseUrl: "http://127.0.0.1:3000",
    video: false, // Disable video recording if not needed
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
  },
};
