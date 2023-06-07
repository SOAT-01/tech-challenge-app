module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.ts$": ["ts-jest", { diagnostics: false }],
  },
  testRegex: "(/__tests__/.*(\\.|/)(test|spec))\\.ts$",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testEnvironment: "node",
};
