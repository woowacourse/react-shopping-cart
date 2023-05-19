import { PRODUCT_LIST } from '@mockData/productList';
import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { useFetch } from '@hooks/useFetch';
import { API_URL_PRODUCT_LIST } from '@constants/common';
import { server } from '../setup-env';

describe('useFetch가 올바르게 작동하는 지 테스트', () => {
  beforeEach(() => {
    server.use(
      rest.get('api/error', (req, res, ctx) => {
        return res(ctx.status(500));
      }),

      rest.get(API_URL_PRODUCT_LIST, (req, res, ctx) => {
        return res(
          ctx.set('Content-Type', 'application/json'),
          ctx.status(200),
          ctx.json(PRODUCT_LIST.productList),
          ctx.delay(1200)
        );
      })
    );
  });
  test('데이터가 불러와지기 전 data가 undefined인지 테스트', () => {
    const { result } = renderHook(() => useFetch(API_URL_PRODUCT_LIST));

    const { isLoading } = result.current;

    expect(isLoading).toBe(true);
  });

  test('데이터가 불러와진 후 data가 올바른 객체인지 테스트', async () => {
    const { result } = renderHook(() => useFetch(API_URL_PRODUCT_LIST));

    await waitFor(
      () => {
        const { data } = result.current;

        expect(data).toEqual(PRODUCT_LIST.productList);
      },
      { timeout: 1500 }
    );
  });

  test('데이터가 불러와지기 전 로딩중이 false 인지 테스트', () => {
    const { result } = renderHook(() => useFetch(API_URL_PRODUCT_LIST));

    const { isLoading } = result.current;

    expect(isLoading).toBe(true);
  });

  test('데이터가 불러와지면 로딩중이 true가 되는 지 테스트', async () => {
    const { result } = renderHook(() => useFetch(API_URL_PRODUCT_LIST));

    await waitFor(
      () => {
        const { isLoading } = result.current;

        expect(isLoading).toBe(false);
      },
      { timeout: 1500 }
    );
  });

  test('데이터를 불러오기 전 에러가 false인지 테스트', () => {
    const { result } = renderHook(() => useFetch(API_URL_PRODUCT_LIST));

    const { error } = result.current;

    expect(error).toBeNull();
  });
  test('fetch를 하던 중 에러가 없다면 에러가 false인지 테스트', async () => {
    const { result } = renderHook(() => useFetch(API_URL_PRODUCT_LIST));

    await waitFor(
      () => {
        const { error } = result.current;

        expect(error).toBeNull();
      },
      { timeout: 1500 }
    );
  });

  interface ErrorType {
    message?: string;
  }

  test('fetch를 하던 중 에러가 있다면 에러가 작동하는 지  테스트', async () => {
    const { result } = renderHook(() =>
      useFetch('api/error', { method: 'GET' })
    );
    await waitFor(
      async () => {
        const { error } = result.current;

        expect((error as ErrorType).message as string).toBe(
          'API 요청에 실패했습니다. status : 500'
        );
      },
      { timeout: 1500 }
    );
  });
});
