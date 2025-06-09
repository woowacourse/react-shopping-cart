import "@testing-library/jest-dom";
import { TextEncoder } from "util";
import React from "react";

globalThis.TextEncoder = TextEncoder;
globalThis.React = React;
