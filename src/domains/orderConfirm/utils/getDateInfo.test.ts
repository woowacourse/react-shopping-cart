import { describe, it, expect } from "vitest";
import { getHours, getMinutes, formatToKoreanAmPm } from "./getDateInfo";

describe("getHours", () => {
  it.each([
    ["14:30:00", 14],
    ["00:15:00", 0],
    ["09:45:00", 9],
  ])("'%s' → %i시", (input, expected) => {
    expect(getHours(input)).toBe(expected);
  });
});

describe("getMinutes", () => {
  it.each([
    ["14:30:00", 30],
    ["00:05:00", 5],
    ["09:00:00", 0],
  ])("'%s' → %i분", (input, expected) => {
    expect(getMinutes(input)).toBe(expected);
  });
});

describe("formatToKoreanAmPm", () => {
  it.each([
    ["09:00:00", "오전 9시"],
    ["00:00:00", "오전 12시"],
    ["11:59:00", "오전 11시"],
    ["12:00:00", "오후 12시"],
    ["13:15:00", "오후 1시"],
    ["23:45:00", "오후 11시"],
  ])("'%s' → %s", (input, expected) => {
    expect(formatToKoreanAmPm(input)).toBe(expected);
  });
});
