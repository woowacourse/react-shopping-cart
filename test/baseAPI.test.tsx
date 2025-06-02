import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { baseAPI } from '../src/api/baseAPI';

describe('baseAPI 실패 케이스', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('서버 응답이 실패일 때 Error를 throw한다', async () => {
    const mockResponse = {
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      headers: new Headers(),
      text: vi
        .fn()
        .mockResolvedValue(JSON.stringify({ message: '에러 발생!' })),
    } as unknown as Response;

    vi.mocked(global.fetch).mockResolvedValueOnce(mockResponse);

    await expect(
      baseAPI({
        method: 'GET',
        path: '/fail',
      })
    ).rejects.toThrow('에러 발생!');
  });
});
