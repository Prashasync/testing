module.exports = {
  collectCoverage: true, // Enables coverage collection
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}", // Include all JavaScript & TypeScript files in src/
    "!src/index.js", // Exclude entry point if needed
    "!src/**/*.test.{js,ts}", // Exclude test files
    "!src/**/node_modules/**" // Exclude dependencies
  ],
  coverageDirectory: "coverage", // Output directory for coverage reports
  coverageReporters: ["json", "lcov", "text", "clover"], // Coverage report formats
};
