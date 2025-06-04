import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { baseAPI } from '../src/api/baseAPI';

describe('baseAPI 실패 케이스', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('400 Bad Request 응답일 때 Error를 throw한다', async () => {
    const mockResponse = {
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      headers: new Headers(),
      json: vi.fn().mockResolvedValue({ message: '잘못된 요청입니다.' }),
    } as unknown as Response;

    vi.mocked(global.fetch).mockResolvedValueOnce(mockResponse);

    await expect(
      baseAPI({
        method: 'GET',
        path: '/fail',
      })
    ).rejects.toThrow('잘못된 요청입니다.');
  });

  it('401 Unauthorized 응답일 때 Error를 throw한다', async () => {
    const mockResponse = {
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
      headers: new Headers(),
      json: vi.fn().mockResolvedValue({ message: '인증이 필요합니다.' }),
    } as unknown as Response;

    vi.mocked(global.fetch).mockResolvedValueOnce(mockResponse);

    await expect(
      baseAPI({
        method: 'GET',
        path: '/unauthorized',
      })
    ).rejects.toThrow('인증이 필요합니다.');
  });

  it('403 Forbidden 응답일 때 Error를 throw한다', async () => {
    const mockResponse = {
      ok: false,
      status: 403,
      statusText: 'Forbidden',
      headers: new Headers(),
      json: vi.fn().mockResolvedValue({ message: '접근이 거부되었습니다.' }),
    } as unknown as Response;

    vi.mocked(global.fetch).mockResolvedValueOnce(mockResponse);

    await expect(
      baseAPI({
        method: 'GET',
        path: '/forbidden',
      })
    ).rejects.toThrow('접근이 거부되었습니다.');
  });

  it('404 Not Found 응답일 때 Error를 throw한다', async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      statusText: 'Not Found',
      headers: new Headers(),
      json: vi
        .fn()
        .mockResolvedValue({ message: '리소스를 찾을 수 없습니다.' }),
    } as unknown as Response;

    vi.mocked(global.fetch).mockResolvedValueOnce(mockResponse);

    await expect(
      baseAPI({
        method: 'GET',
        path: '/not-found',
      })
    ).rejects.toThrow('리소스를 찾을 수 없습니다.');
  });

  it('500 Internal Server Error 응답일 때 Error를 throw한다', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      headers: new Headers(),
      json: vi.fn().mockResolvedValue({ message: '서버 오류가 발생했습니다.' }),
    } as unknown as Response;

    vi.mocked(global.fetch).mockResolvedValueOnce(mockResponse);

    await expect(
      baseAPI({
        method: 'GET',
        path: '/server-error',
      })
    ).rejects.toThrow('서버 오류가 발생했습니다.');
  });
});
