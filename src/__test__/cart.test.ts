import { ProductInformation } from '@type/types';
import {
  changedQuantityCart,
  createCartItem,
  removedItemCart,
} from '@utils/cart';

const product: ProductInformation = {
  id: 1,
  name: '삼다수',
  price: 1200,
  imageUrl: '',
};

describe('cart에 대한 함수가 올바르게 작동하는 지 테스트합니다.', () => {
  test('상품을 장바구니 API에 맞게 올바르게 만드는 지 테스트', () => {
    const cartItem = createCartItem(product);

    expect(cartItem).toEqual({
      id: product.id,
      product,
      quantity: 1,
    });
  });

  test('장바구니에 담긴 상품의 수량을 올바르게 변경하는 지 테스트', () => {
    const cartItem = createCartItem(product);
    const cart = [cartItem];

    const updatedCart = changedQuantityCart({
      cart,
      id: product.id,
      quantity: 50,
    });

    expect(updatedCart[0]).toEqual({
      id: product.id,
      product,
      quantity: 50,
    });
  });

  test('장바구니에 담긴 상품을 제거할 때 제거가 되는 지 테스트', () => {
    const cartItem = createCartItem(product);
    const cart = [cartItem];

    const updatedCart = removedItemCart(cart, product.id);

    expect(updatedCart).toEqual([]);
  });
});
