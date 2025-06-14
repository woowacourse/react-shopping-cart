import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './node';

// 모든 테스트 시작 전에 서버 시작
beforeAll(() => server.listen());

// 각 테스트 후에 핸들러 리셋
afterEach(() => server.resetHandlers());

// 모든 테스트 완료 후 서버 종료
afterAll(() => server.close());
