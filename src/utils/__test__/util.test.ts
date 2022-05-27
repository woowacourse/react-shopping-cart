import { CartStoreState } from 'types/index';
import isProductInCart from 'utils/validator';

describe('util 함수 테스트', () => {
  test('해당 상품이 장바구니에 있는지 여부를 올바르게 판단하여 반환할 수 있다.', () => {
    const cart: CartStoreState['cart'] = [
      {
        id: 1,
        stock: 2,
        checked: true,
      },
      {
        id: 2,
        stock: 1,
        checked: false,
      },
    ];
    const productId1 = 1;

    expect(isProductInCart(productId1, cart)).toBeTruthy();

    const productId2 = 9999;

    expect(isProductInCart(productId2, cart)).toBeFalsy();
  });
});
