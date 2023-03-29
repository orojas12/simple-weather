/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["node_modules/(?!nanoid/.*)"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    "^@context(.*)$": "<rootDir>/src/context$1",
    "^@components(.*)$": "<rootDir>/src/components$1",
    "^@hooks(.*)$": "<rootDir>/src/hooks$1",
    "^@icons(.*)$": "<rootDir>/src/icons$1",
    "^@lib(.*)$": "<rootDir>/src/lib$1",
    "^@pages(.*)$": "<rootDir>/src/pages$1",
  },
};
