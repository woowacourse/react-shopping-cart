import { PRODUCT_LIST } from '@mockData/productList';
import { CartInformation, ProductInformation } from '@type/types';
import {
  allSelectCartItem,
  calculateSelectCartTotalPrice,
  cartItemSelectedById,
  changedQuantityCart,
  createServerCartItem,
  removeSelectedCartItem,
  removedItemCart,
  toggleSelectCartItem,
} from '@utils/cart';

const [product1, product2, product3, product4] = PRODUCT_LIST.productList;

describe('cart에 대한 함수가 올바르게 작동하는 지 테스트합니다.', () => {
  test('상품을 장바구니 API에 맞게 올바르게 만드는 지 테스트', () => {
    const cartItem = createServerCartItem(product1);

    expect(cartItem).toEqual({
      id: product1.id,
      product: product1,
      quantity: 1,
    });
  });

  test('장바구니에 담긴 상품의 수량을 올바르게 변경하는 지 테스트', () => {
    const cartItem = createServerCartItem(product1);
    const cart = [cartItem];

    const updatedCart = changedQuantityCart({
      cart,
      id: product1.id,
      quantity: 50,
    });

    expect(updatedCart[0]).toEqual({
      id: product1.id,
      product: product1,
      quantity: 50,
    });
  });

  test('장바구니에 담긴 상품을 제거할 때 제거가 되는 지 테스트', () => {
    const cartItem = createServerCartItem(product1);
    const cart = [cartItem];

    const updatedCart = removedItemCart(cart, product1.id);

    expect(updatedCart).toEqual([]);
  });

  test('장바구니에 담긴 상품을 체크 박스를 눌렀을 때 선택되었던 상태가 반대로 변경되는 지 테스트', () => {
    const cartItem = createServerCartItem(product1);
    const cart: CartInformation[] = [{ ...cartItem, isSelect: true }];
    const updatedCart = toggleSelectCartItem(cart, product1.id);

    expect(updatedCart).toEqual([{ ...cartItem, isSelect: false }]);
  });

  test('장바구니에 담긴 선택된 상품의 총 가격이 올바르게 작동하는 지 테스트', () => {
    const cartItem1 = createServerCartItem(product1);
    const cartItem2 = createServerCartItem(product2);
    const cartItem3 = createServerCartItem(product3);

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
    const cartItem1 = createServerCartItem(product1);
    const cartItem2 = createServerCartItem(product2);
    const cartItem3 = createServerCartItem(product3);

    const cart: CartInformation[] = [
      { ...cartItem1, isSelect: true },
      { ...cartItem2, isSelect: false },
      { ...cartItem3, isSelect: true },
    ];

    const updatedCart = removeSelectedCartItem(cart);

    expect(updatedCart).toEqual([{ ...cartItem2, isSelect: false }]);
  });

  test('장바구니 페이지에서 전체 선택을 눌렀을 때 모든 장바구니 아이템이 선택되는 기능이 올바르게 작동하는 지 테스트', () => {
    const cartItem1 = createServerCartItem(product1);
    const cartItem2 = createServerCartItem(product2);
    const cartItem3 = createServerCartItem(product3);

    const cart: CartInformation[] = [
      { ...cartItem1, isSelect: true },
      { ...cartItem2, isSelect: false },
      { ...cartItem3, isSelect: true },
    ];

    const updatedCart = allSelectCartItem(cart, true);

    expect(updatedCart).toEqual([
      { ...cartItem1, isSelect: true },
      { ...cartItem2, isSelect: true },
      { ...cartItem3, isSelect: true },
    ]);
  });
  test('장바구니 페이지에서 전체 선택이 되어있는 상태에서 전체 선택 버튼을 눌렀을 때 모두 선택이 풀리는 기능이 올바르게 작동하는 지 테스트', () => {
    const cartItem1 = createServerCartItem(product1);
    const cartItem2 = createServerCartItem(product2);
    const cartItem3 = createServerCartItem(product3);

    const cart: CartInformation[] = [
      { ...cartItem1, isSelect: true },
      { ...cartItem2, isSelect: false },
      { ...cartItem3, isSelect: true },
    ];

    const updatedCart = allSelectCartItem(cart, false);

    expect(updatedCart).toEqual([
      { ...cartItem1, isSelect: false },
      { ...cartItem2, isSelect: false },
      { ...cartItem3, isSelect: false },
    ]);
  });

  test('장바구니 아이템 중 선택된 아이템들의 아이디 배열을 반환하는 기능이 올바르게 작동하는 지 테스트', () => {
    const cartItem1 = createServerCartItem(product1);
    const cartItem2 = createServerCartItem(product2);
    const cartItem3 = createServerCartItem(product3);
    const cartItem4 = createServerCartItem(product4);

    const cart: CartInformation[] = [
      { ...cartItem1, isSelect: true },
      { ...cartItem2, isSelect: false },
      { ...cartItem3, isSelect: true },
      { ...cartItem4, isSelect: true },
    ];

    const updatedCart = cartItemSelectedById(cart);

    expect(updatedCart).toEqual([product1.id, product3.id, product4.id]);
  });
});
