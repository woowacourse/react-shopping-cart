import { setupServer } from 'msw/node';

export const server = setupServer();
// 여기에 요청-응답 매핑을 정의합니다.

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

global.fetch = jest.fn();