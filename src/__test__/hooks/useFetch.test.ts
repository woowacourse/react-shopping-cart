import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import useGetFetch from '@hooks/useGetFetch';
import { PRODUCT_URL } from '@constants/common';
import { PRODUCT_LIST } from '../../mockData/productList';
import { server } from './setup-env';

describe('상품 목록 fetch 테스트', () => {
  beforeEach(() => {
    server.use(
      rest.get('/error', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
      rest.get('/products', (req, res, ctx) => {
        const data = PRODUCT_LIST.productList;

        if (!data) {
          return res(ctx.status(403), ctx.json(data));
        }

        return res(ctx.status(200), ctx.json(data));
      })
    );
  });
  test('상품 목록 fetch 했을 때 데이터가 오기 전까지 로딩이 true인지 테스트', () => {
    const { result } = renderHook(() =>
    useGetFetch(PRODUCT_URL, { method: 'GET' })
    );
    const { isLoading } = result.current;

    expect(isLoading).toBe(true);
  });

  test('상품 목록 fetch 했을 때 데이터가 온 후 로딩이 false인지 테스트', async () => {
    const { result } = renderHook(() =>
    useGetFetch(PRODUCT_URL, { method: 'GET' })
    );

    await waitFor(
      () => {
        const { isLoading } = result.current;
        expect(isLoading).toBe(false);
      },
      { timeout: 1700 }
    );
  });

  test('상품 목록 fetch하면 가짜 데이터를 올바르게 가져오는지', async () => {
    const { result } = renderHook(() =>
    useGetFetch(PRODUCT_URL, { method: 'GET' })
    );

    await waitFor(
      () => {
        expect(result.current.data).toEqual(PRODUCT_LIST.productList);
      },
      { timeout: 1700 }
    );
  });

  interface ErrorType {
    message?: string;
  }

  test('상품 목록 fetch 할 때 가짜 데이터를 가져올 수 없는 경우를 테스트', async () => {
    const { result } = renderHook(() => useGetFetch('/error', { method: 'GET' }));

    await waitFor(
      () => {
        const { error } = result.current;
        expect((error as ErrorType).message).toBe(
          'api 요청을 실패했습니다! status: 500'
        );
      },
      { timeout: 1700 }
    );
  });
});
