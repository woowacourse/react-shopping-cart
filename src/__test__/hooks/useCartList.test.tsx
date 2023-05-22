import { PRODUCT_LIST } from '@mockData/productList';
import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import useCartList from '@hooks/useCartList';
import { RequestCartParams } from '@mocks/handlers';
import { CartInformation, ProductInformation } from '@type/types';
import { createCartItem, removedItemCart } from '@utils/cart';
import { changedQuantityCart } from '@utils/cart';
import { fetchGet } from '@utils/fetch';
import { API_URL_CART_LIST, API_URL_PRODUCT_LIST } from '@constants/common';
import { server } from '../setup-env';

describe('API 변경에 유연하도록 구현한 useProductList API 레이어가 올바르게 기능하는 지 테스트', () => {
  let receivedData: CartInformation[] = [];

  beforeEach(() => {
    receivedData = [];
    server.use(
      rest.get(`${API_URL_PRODUCT_LIST}/:productId`, async (req, res, ctx) => {
        const { productId } = req.params;

        const data = PRODUCT_LIST.productList.find(
          (product) => product.id === Number(productId.toString())
        );

        return res(
          ctx.set('Content-Type', 'application/json'),
          ctx.status(200),
          ctx.json(data),
          ctx.text('OK')
        );
      }),

      rest.get(API_URL_CART_LIST, (req, res, ctx) => {
        return res(
          ctx.set('Content-Type', 'application/json'),
          ctx.status(200),
          ctx.json(receivedData),
          ctx.delay(100),
          ctx.text('OK')
        );
      }),

      rest.post(API_URL_CART_LIST, async (req, res, ctx) => {
        try {
          const { productId }: RequestCartParams = await req.json();

          if (!productId) {
            console.error('요청한 값이 올바르지 않습니다.');
            return res(ctx.status(400), ctx.text('잘못된 요청입니다.'));
          }

          const product = await fetchGet<ProductInformation>(
            `${API_URL_PRODUCT_LIST}/${productId}`
          );

          if (!product) {
            console.error('요청한 값이 올바르지 않습니다.');
            return res(ctx.status(400), ctx.text('잘못된 요청입니다.'));
          }

          receivedData.push(createCartItem(product));

          return res(
            ctx.set('Content-Type', 'application/json'),
            ctx.status(201),
            ctx.json('Created')
          );
        } catch (error) {
          console.error('잘못된 JSON', error);
          return res(ctx.status(400), ctx.text('잘못된 요청입니다.'));
        }
      }),

      rest.patch(`${API_URL_CART_LIST}/:cartItemId`, async (req, res, ctx) => {
        const { cartItemId } = req.params;
        const { quantity }: RequestCartParams = await req.json();

        const cartItem = receivedData.find(
          (item) => item.id === Number(cartItemId)
        );

        if (!cartItem) {
          console.error('요청한 값이 올바르지 않습니다.');
          return res(ctx.status(400), ctx.text('잘못된 요청입니다.'));
        }

        const updated = changedQuantityCart({
          cart: receivedData,
          id: Number(cartItemId),
          quantity: Number(quantity),
        });

        receivedData = updated;

        return res(ctx.status(200), ctx.text('OK'));
      }),

      rest.delete(`${API_URL_CART_LIST}/:cartItemId`, (req, res, ctx) => {
        const { cartItemId } = req.params;

        const cartItem = receivedData.find(
          (item) => item.id === Number(cartItemId)
        );

        if (!cartItem) {
          console.error('요청한 값이 올바르지 않습니다.');
          return res(ctx.status(400), ctx.text('잘못된 요청입니다.'));
        }

        const removed = removedItemCart(receivedData, Number(cartItemId));

        receivedData = removed;

        return res(ctx.status(204));
      })
    );
  });

  test('상품 정보를 장바구니로 POST 했을 때 장바구니 리스트에 추가되는 지 테스트', async () => {
    const { result } = renderHook(() => useCartList());

    const { addItemToCart } = result.current;

    const product = PRODUCT_LIST.productList[0];

    addItemToCart({
      productId: product.id,
    });

    await waitFor(async () => {
      const { data } = result.current;

      await expect(data).toEqual([createCartItem(product)]);
    });
  });

  test('장바구니 아이템의 수량을 변경했을 때 PATCH가 올바르게 기능하여 수량이 변경되는지 테스트', async () => {
    const { result } = renderHook(() => useCartList());

    const { addItemToCart, updateCartItem } = result.current;

    const product = PRODUCT_LIST.productList[0];

    addItemToCart({
      productId: product.id,
    });

    await waitFor(async () => {
      await updateCartItem({ cartItemId: product.id, quantity: 3 });
    });

    await waitFor(async () => {
      const { data } = result.current;
      await expect(data).toEqual([{ ...createCartItem(product), quantity: 3 }]);
    });
  });

  test('장바구니 아이템을 삭제했을 때 DELETE가 올바르게 기능하여 삭제 되는 지 테스트', async () => {
    const { result } = renderHook(() => useCartList());

    const { addItemToCart, removeItemFromCart } = result.current;

    const product = PRODUCT_LIST.productList[0];

    addItemToCart({
      productId: product.id,
    });

    await waitFor(async () => {
      const { data } = result.current;

      await expect(data).toEqual([createCartItem(product)]);
    });

    await waitFor(async () => {
      await removeItemFromCart({ cartItemId: product.id });
    });

    await waitFor(async () => {
      const { data } = result.current;

      await expect(data).toEqual([]);
    });
  });

  test('프론트엔드에서 의도한 장바구니 API 레이어가 올바르게 기능하는 지 테스트', async () => {
    const { result } = renderHook(() => useCartList());

    const { addItemToCart } = result.current;

    const product = PRODUCT_LIST.productList[0];

    addItemToCart({
      productId: product.id,
    });

    await waitFor(async () => {
      const { data } = result.current;

      const keys = Object.keys(data ? data[0] : []);

      await expect(keys).toEqual(['id', 'quantity', 'product']);
    });

    await waitFor(async () => {
      const { data } = result.current;

      const productKeys = Object.keys(data[0].product);

      await expect(productKeys).toEqual(['id', 'name', 'price', 'imageUrl']);
    });
  });
});
