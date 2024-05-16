const dotenv = require("dotenv");

// .env.test 파일에서 환경 변수를 로드합니다.
dotenv.config({ path: ".env.test" });

// import.meta.env를 모킹합니다.
(global as any).import = {
  meta: {
    env: {
      VITE_BASE_URL: process.env.REACT_APP_BASE_URL,
      VITE_USERNAME: process.env.REACT_APP_USERNAME,
      VITE_PASSWORD: process.env.REACT_APP_PASSWORD,
      // 필요한 다른 환경 변수도 여기에 추가합니다.
    },
  },
};

import server from "./mocks/server";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
