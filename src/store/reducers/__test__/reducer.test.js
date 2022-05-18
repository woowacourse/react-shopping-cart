import { PRODUCT_LIST_PAGE_LIMIT } from '/api/constants';

import cartReducer, { cartActionType } from 'store/reducers/cart';
import productReducer, { productActionTypes } from 'store/reducers/product';

describe('상품 리듀서 테스트', () => {
  const initialState = {
    productList: [],
    totalProductCount: null,
    isLoading: false,
  };

  const reducer = (action) => productReducer(initialState, action);

  const productList = [
    {
      id: 1,
      name: '캠핑 의자',
      price: 35000,
      imageURL: 'https://thawing-fortress-83192.herokuapp.com/static/images/camping-chair.jpg',
      quantity: 100,
    },
    {
      id: 2,
      name: '그릴',
      price: 100000,
      imageURL: 'https://thawing-fortress-83192.herokuapp.com/static/images/grill.jpg',
      quantity: 100,
    },
    {
      id: 3,
      name: '아이스박스',
      price: 20000,
      imageURL: 'https://thawing-fortress-83192.herokuapp.com/static/images/icebox.jpg',
      quantity: 100,
    },
  ];

  test('상품목록 불러오기 요청이 발생하면 상품목록 상태가 업데이트 된다.', () => {
    const { productList: newProductList } = reducer({
      type: productActionTypes.LIST_FETCH,
      payload: { productList },
    });

    expect(newProductList).toEqual(productList);
  });

  test('전체 상품목록의 길이에 따라서 올바른 페이지 개수 상태가 업데이트 된다.', () => {
    const totalProductCount = 150;
    const expectedPageCount = Math.ceil(totalProductCount / PRODUCT_LIST_PAGE_LIMIT);

    const { pageCount } = reducer({
      type: productActionTypes.LIST_FETCH,
      payload: { totalProductCount: 150 },
    });

    expect(pageCount).toEqual(expectedPageCount);
  });
});

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
