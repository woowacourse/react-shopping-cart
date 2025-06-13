/* eslint-disable @typescript-eslint/no-var-requires */
import "@testing-library/jest-dom";

if (typeof global.TextEncoder === "undefined") {
  const { TextEncoder, TextDecoder } = require("util");
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

if (typeof global.URL === "undefined") {
  global.URL = require("url").URL;
  global.URLSearchParams = require("url").URLSearchParams;
}
