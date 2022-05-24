import cart from 'modules/cart';

describe('cart reducer 테스트 (action에 맞춰서, 상태를 의도한대로 잘 변경할 수 있다.)', () => {
  test('카트를 클릭하면, 해당 상품을 정상적으로 장바구니 상태에 추가해야 한다.', () => {
    // given
    const initialState = {
      carts: [],
      errorMessage: '',
      isCheckedAll: false,
    };
    const product = {
      id: 1,
      imgSrc: 'test',
      title: '위니컵',
      price: 1000,
    };

    // when
    const action = { type: 'REQUEST_CART_ADD', product };

    // then
    expect(cart(initialState, action)).toEqual({
      ...initialState,
      carts: [{ ...action.product, quantity: 1, isChecked: true, total: action.product.price }],
    });
  });

  test('이미 존재하는 상품을 카트에 추가한 경우, 상품의 quantity가 2로 저장된다.', () => {
    // given
    const initialState = {
      carts: [
        {
          id: 1,
          imgSrc: 'test',
          title: '위니컵',
          price: 1000,
          quantity: 1,
          isChecked: true,
          total: 1000,
        },
      ],
      errorMessage: '',
      isCheckedAll: false,
    };
    const product = {
      id: 1,
      imgSrc: 'test',
      title: '위니컵',
      price: 1000,
    };

    // when
    const action = { type: 'REQUEST_EXIST_PRODUCT_ADD', productIdx: 0 };

    /// then
    expect(cart(initialState, action)).toEqual({
      ...initialState,
      carts: [{ ...product, quantity: 2, isChecked: true, total: 2000 }],
    });
  });

  test('카드에 있는 상품을 삭제하면, 카트의 상태가 변경된다.', () => {
    // given
    const initialState = {
      carts: [
        {
          id: 1,
          imgSrc: 'test',
          title: '위니컵',
          price: 1000,
          quantity: 1,
          isChecked: true,
          total: 1000,
        },
      ],
      errorMessage: '',
      isCheckedAll: false,
    };

    // when
    const action = { type: 'REQUEST_PRODUCT_DELETE', productIdx: 0 };

    /// then
    expect(cart(initialState, action)).toEqual({
      ...initialState,
      carts: [],
    });
  });

  test('카드에 있는 상품 중 체크한 상품을 삭제하면, 카트의 상태가 변경된다.', () => {
    // given
    const initialState = {
      carts: [
        {
          id: 1,
          imgSrc: 'test',
          title: '위니컵',
          price: 1000,
          quantity: 1,
          isChecked: true,
          total: 1000,
        },
        {
          id: 2,
          imgSrc: 'test',
          title: '율리컵',
          price: 2000,
          quantity: 1,
          isChecked: false,
          total: 2000,
        },
        {
          id: 3,
          imgSrc: 'test',
          title: '율리펜',
          price: 500,
          quantity: 1,
          isChecked: true,
          total: 500,
        },
      ],
      errorMessage: '',
      isCheckedAll: false,
    };

    // when
    const action = { type: 'REQUEST_CHECKED_PRODUCT_DELETE' };

    /// then
    expect(cart(initialState, action)).toEqual({
      ...initialState,
      carts: [
        {
          id: 2,
          imgSrc: 'test',
          title: '율리컵',
          price: 2000,
          quantity: 1,
          isChecked: false,
          total: 2000,
        },
      ],
    });
  });
});
