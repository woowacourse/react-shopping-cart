import cartReducer, { cartActionType } from '../cart';

describe('장바구니 리듀서 테스트', () => {
  const initialState = {
    cart: {},
    checkedProductList: [],
    isLoading: false,
  };

  const productData = {
    id: 2,
    imageURL: 'https://thawing-fortress-83192.herokuapp.com/static/images/grill.jpg',
    name: '그릴',
    price: 100000,
    quantity: 100,
  };
  const quantity = 1;

  const reducer = (action) => cartReducer(initialState, action);
  test('장바구니 상태 변경 요청이 발생하면 정상적으로 장바구니 상태가 변경되어야 한다.', () => {
    const newCartData = { [productData.id]: { productData, quantity } };

    expect(
      reducer({
        type: cartActionType.UPDATE,
        payload: {
          cart: newCartData,
        },
      }),
    ).toEqual({ ...initialState, cart: newCartData });
  });

  test('장바구니 정보를 새로 불러오는 요청이 발생하면 체크된 상품 목록에 전체 상품이 추가된다.', () => {
    const newCartData = { [productData.id]: { productData, quantity } };
    const cartLength = Object.keys(newCartData).length;

    const { checkedProductList } = reducer({
      type: cartActionType.FETCH,
      payload: {
        cart: newCartData,
      },
    });

    expect(checkedProductList.length).toEqual(cartLength);
  });

  test('체크된 상품이 제거되면 목록의 길이가 감소해야 한다.', () => {
    const newCartData = { [productData.id]: { productData, quantity } };

    const { checkedProductList: previousList } = reducer({
      type: cartActionType.FETCH,
      payload: {
        cart: newCartData,
      },
    });

    const { checkedProductList: updatedList } = reducer({
      type: cartActionType.UPDATE_CHECKED_LIST,
      payload: {
        checkedProductList: [],
      },
    });

    expect(updatedList.length).toEqual(previousList.length - 1);
  });
});
