import { PRODUCT_LIST } from '@mockData/productList';
import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import useProductList from '@hooks/useProductList';
import { API_URL_PRODUCT_LIST } from '@constants/common';
import { server } from '../setup-env';

describe('API 변경에 유연하도록 구현한 useProductList API 레이어가 올바르게 기능하는 지 테스트', () => {
  beforeEach(() => {
    server.use(
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

  test('프론트엔드에서 의도한 API 레이어가 올바르게 기능하는 지 테스트', async () => {
    const { result } = renderHook(() => useProductList());

    await waitFor(
      () => {
        const { data } = result.current;

        const keys = Object.keys(data ? data[0] : []);

        expect(keys).toEqual(['id', 'name', 'price', 'imageUrl']);
      },
      { timeout: 1500 }
    );
  });
});
