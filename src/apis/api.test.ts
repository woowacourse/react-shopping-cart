import { fetchQuery, FetchQueryInstance } from './api';

const BASE = 'http://localhost:3000';
const PATH = '/test';
const RESOLVED_VALUE = { test: true };
const REQUEST_BODY = { body: true };

describe('fetchQuery', () => {
  let fetcher: FetchQueryInstance;
  beforeEach(() => {
    fetcher = fetchQuery.create({ baseURL: BASE });
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(RESOLVED_VALUE),
    });
  });
  test('get', async () => {
    const data = await fetcher.get(PATH);

    expect(data).toEqual(RESOLVED_VALUE);
    expect(fetch).toHaveBeenCalledWith(new URL(PATH, BASE), {
      baseURL: BASE,
      method: 'get',
    });
  });

  test('post', async () => {
    const data = await fetcher.post(PATH, {
      body: REQUEST_BODY,
    });

    expect(data).toEqual(RESOLVED_VALUE);
    expect(fetch).toHaveBeenCalledWith(new URL(PATH, BASE), {
      baseURL: BASE,
      body: JSON.stringify(REQUEST_BODY),
      method: 'post',
    });
  });
});
