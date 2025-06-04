import "@testing-library/jest-dom";

import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
// @ts-expect-error TextDecoder 타입 호환성 문제
global.TextDecoder = TextDecoder;

// React Router DOM을 위한 추가 설정
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Location 객체 모킹 (React Router를 위해)
const mockLocation = {
  ...window.location,
  assign: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
};
Object.defineProperty(window, "location", {
  value: mockLocation,
  writable: true,
});

// window.location 타입 정의
declare global {
  interface Window {
    location: Location;
  }
}
