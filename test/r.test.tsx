import { render } from "@testing-library/react";
import App from "../src/App";
import type { ReactNode } from "react";

// React Router DOM 모킹
jest.mock("react-router-dom", () => ({
  RouterProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

// apiClient 모킹
jest.mock("../src/services/apiClient", () => ({
  apiClient: jest.fn(),
}));

// router 모킹
jest.mock("../src/router/routes", () => ({
  __esModule: true,
  default: {},
}));

// React Router DOM 모킹
jest.mock('react-router-dom', () => ({
  RouterProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

// apiClient 모킹
jest.mock('../src/services/apiClient', () => ({
  apiClient: jest.fn(),
}));

// router 모킹
jest.mock('../src/router/routes', () => ({
  __esModule: true,
  default: {},
}));

describe('RTL Test', () => {
  it('should render', () => {
    render(<App />);
    // 테스트는 App이 오류 없이 렌더링되는지 확인
  });
});
