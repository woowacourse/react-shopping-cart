import { CartInformation, ProductInformation } from '@type/types';
import {
  changedQuantityCart,
  createServerCartItem,
  removeSelectedCartItem,
  removedItemCart,
  toggleSelectCartItem,
} from '@utils/cart';

const product: ProductInformation = {
  id: 1,
  name: '삼다수',
  price: 1200,
  imageUrl: '',
};

describe('cart에 대한 함수가 올바르게 작동하는 지 테스트합니다.', () => {
  test('상품을 장바구니 API에 맞게 올바르게 만드는 지 테스트', () => {
    const cartItem = createServerCartItem(product);

    expect(cartItem).toEqual({
      id: product.id,
      product,
      quantity: 1,
    });
  });

  test('장바구니에 담긴 상품의 수량을 올바르게 변경하는 지 테스트', () => {
    const cartItem = createServerCartItem(product);
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
    const cartItem = createServerCartItem(product);
    const cart = [cartItem];

    const updatedCart = removedItemCart(cart, product.id);

    expect(updatedCart).toEqual([]);
  });

  test('장바구니에 담긴 상품을 체크 박스를 눌렀을 때 선택되었던 상태가 반대로 변경되는 지 테스트', () => {
    const cartItem = createServerCartItem(product);
    const cart: CartInformation[] = [{ ...cartItem, isSelect: true }];
    const updatedCart = toggleSelectCartItem(cart, product.id);

    expect(updatedCart).toEqual([{ ...cartItem, isSelect: false }]);
  });

  test('장바구니에 담긴 선택된 상품의 총 가격이 올바르게 작동하는 지 테스트', () => {
    const cartItem1 = createServerCartItem(product);
    const cartItem2 = createServerCartItem(product);
    const cartItem3 = createServerCartItem(product);

    const cart: CartInformation[] = [
      { ...cartItem1, isSelect: true },
      { ...cartItem2, isSelect: false },
      { ...cartItem3, isSelect: true },
    ];

    const totalCartPrice = calculateSelectCartTotalPrice(cart);

    expect(totalCartPrice).toEqual(
      cartItem1.quantity * cartItem1.product.price +
        cartItem3.quantity * cartItem3.product.price
    );
  });

  test('장바구니에서 선택한 아이템을 삭제하는 기능이 올바르게 작동하는 지 테스트', () => {
    const cartItem1 = createServerCartItem(product);
    const cartItem2 = createServerCartItem(product);
    const cartItem3 = createServerCartItem(product);

    const cart: CartInformation[] = [
      { ...cartItem1, isSelect: true },
      { ...cartItem2, isSelect: false },
      { ...cartItem3, isSelect: true },
    ];

    const updatedCart = removeSelectedCartItem(cart);

    expect(updatedCart).toEqual([{ ...cartItem2, isSelect: false }]);
  });

  test('장바구니 페이지에서 전체 선택을 눌렀을 때 모든 장바구니 아이템이 선택되는 기능이 올바르게 작동하는 지 테스트', () => {
    const cartItem1 = createServerCartItem(product);
    const cartItem2 = createServerCartItem(product);
    const cartItem3 = createServerCartItem(product);

    const cart: CartInformation[] = [
      { ...cartItem1, isSelect: true },
      { ...cartItem2, isSelect: false },
      { ...cartItem3, isSelect: true },
    ];

    const updatedCart = allSelectCartItem(cart);

    expect(updatedCart).toEqual([
      { ...cartItem1, isSelect: true },
      { ...cartItem2, isSelect: true },
      { ...cartItem3, isSelect: true },
    ]);
  });
});
