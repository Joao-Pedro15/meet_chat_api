module.exports = {
  bail: 1,
  clearMocks: true,
  collectCoverage: false,
  // setupFiles: ["dotenv/config"],
  roots: ["<rootDir>/test"],
  collectCoverageFrom: [
    "<rootDir>/test/**/*.ts",
    "!**/test/**",
    "!**/index.ts",
    "!**/*test.ts",
    "!**/*spec.ts",
    "!**/*specdb.ts",
  ],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};