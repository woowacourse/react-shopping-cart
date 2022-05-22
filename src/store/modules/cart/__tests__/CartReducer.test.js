import { actionTypes } from '../actionTypes';
import cartReducer from '../index';

const products = [
  {
    id: '1',
    name: '아이스컵 92파이 16온스(국산형)',
    price: '51000',
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/9fed83ff-2dc3-448b-9aac-1d4a750b3720.jpg',
    category: 'person',
    amount: 10,
  },
];

const cartStoreState = {
  products: [
    {
      id: '1',
      name: '아이스컵 92파이 16온스(국산형)',
      price: '51000',
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/main/9fed83ff-2dc3-448b-9aac-1d4a750b3720.jpg',
      category: 'person',
      amount: 10,
    },
  ],
  checkedIds: ['1'],
  count: 1,
  orderDetail: {
    1: {
      id: '1',
      quantity: 1,
      price: '51000',
      paymentAmount: '51000',
    },
  },
};

const addCartStoreState = {
  products: [
    {
      id: '1',
      name: '아이스컵 92파이 16온스(국산형)',
      price: '51000',
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/main/9fed83ff-2dc3-448b-9aac-1d4a750b3720.jpg',
      category: 'person',
      amount: 10,
    },
    {
      id: '5',
      name: '캔시머 페트캔(500ml) 큐브',
      price: '30500',
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/main/6488a856-f3cd-4d52-b0e0-59cfa2533cd8.jpg',
      category: 'beverage',
      amount: 5,
    },
  ],
  checkedIds: ['1', '5'],
  count: 2,
  orderDetail: {
    1: {
      id: '1',
      quantity: 1,
      price: '51000',
      paymentAmount: '51000',
    },
  },
};

describe('[장바구니 Reducer] 세팅, 추가, 삭제 테스트', () => {
  let initialState = {
    products: [],
    checkedIds: [],
    count: 0,
    orderDetail: {},
  };

  const product = {
    id: '5',
    name: '캔시머 페트캔(500ml) 큐브',
    price: '30500',
    imageUrl:
      'https://cdn-mart.baemin.com/sellergoods/main/6488a856-f3cd-4d52-b0e0-59cfa2533cd8.jpg',
    category: 'beverage',
    amount: 5,
  };

  const reducer = (action) => {
    initialState = cartReducer(initialState, action);
  };

  test('cart 저장소에 초기 데이터를 세팅해야한다.', () => {
    reducer({
      type: actionTypes.SET_CART_PRODUCT_LIST,
      payload: products,
    });

    expect(initialState).toEqual(cartStoreState);
  });

  test('cart 저장소에 상품을 추가 할 수 있어야 한다.', () => {
    reducer({
      type: actionTypes.ADD_PRODUCT_TO_CART,
      payload: product,
    });

    expect(initialState).toEqual(addCartStoreState);
  });

  test('cart 저장소에 해당 상품을 제거 할 수 있어야 한다.', () => {
    const id = product.id;

    reducer({
      type: actionTypes.REMOVE_PRODUCT_TO_CART,
      payload: id,
    });

    expect(initialState).toEqual(cartStoreState);
  });
});

describe('[장바구니 페이지에서 사용되는 Reducer 데이터] check 테스트', () => {
  let initialState = {
    products: [],
    checkedIds: [],
    count: 0,
    orderDetail: {},
  };

  const products = [
    {
      id: '1',
      name: '아이스컵 92파이 16온스(국산형)',
      price: '51000',
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/main/9fed83ff-2dc3-448b-9aac-1d4a750b3720.jpg',
      category: 'person',
      amount: 10,
    },
    {
      id: '5',
      name: '캔시머 페트캔(500ml) 큐브',
      price: '30500',
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/main/6488a856-f3cd-4d52-b0e0-59cfa2533cd8.jpg',
      category: 'beverage',
      amount: 5,
    },
  ];

  const reducer = (action) => {
    initialState = cartReducer(initialState, action);
  };

  reducer({
    type: actionTypes.SET_CART_PRODUCT_LIST,
    payload: products,
  });

  test('체크 활성화 상품을 체크해제 할 수 있어야 한다.', () => {
    const id = '5';
    const checkedIds = ['1'];

    reducer({
      type: actionTypes.UN_CHECK,
      payload: id,
    });
    expect(initialState.checkedIds).toEqual(checkedIds);
  });

  test('체크 비활성 상품을 체크 할 수 있어야 한다.', () => {
    const id = '5';
    const checkedIds = ['1', '5'];

    reducer({
      type: actionTypes.CHECK,
      payload: id,
    });
    expect(initialState.checkedIds).toEqual(checkedIds);
  });

  test('장바구니의 모든 상품을 체크 비활성화 할 수 있어야 한다.', () => {
    const checkedIds = [];

    reducer({
      type: actionTypes.ALL_UN_CHECK,
    });
    expect(initialState.checkedIds).toEqual(checkedIds);
  });

  test('장바구니의 모든 상품을 체크 활성화 할 수 있어야 한다.', () => {
    const checkedIds = ['1', '5'];

    reducer({
      type: actionTypes.ALL_CHECK,
    });
    expect(initialState.checkedIds).toEqual(checkedIds);
  });
});

describe('[장바구니 페이지에서 사용되는 Reducer 데이터] 상품 수량 증감 테스트', () => {
  let initialState = {
    products: [],
    checkedIds: [],
    count: 0,
    orderDetail: {},
  };

  const products = [
    {
      id: '1',
      name: '아이스컵 92파이 16온스(국산형)',
      price: '51000',
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/main/9fed83ff-2dc3-448b-9aac-1d4a750b3720.jpg',
      category: 'person',
      amount: 10,
    },
    {
      id: '5',
      name: '캔시머 페트캔(500ml) 큐브',
      price: '30500',
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/main/6488a856-f3cd-4d52-b0e0-59cfa2533cd8.jpg',
      category: 'beverage',
      amount: 5,
    },
  ];

  const reducer = (action) => {
    initialState = cartReducer(initialState, action);
  };

  reducer({
    type: actionTypes.SET_CART_PRODUCT_LIST,
    payload: products,
  });

  test('장바구니의 해당 상품의 수량 및 변경된 가격 등 detail 정보를 변경 할 수 있어야 한다.', () => {
    const myOrderDetail = {
      id: '1',
      quantity: '2',
      price: '51000',
      paymentAmount: '102000',
    };

    const orderDetail = {
      1: {
        ...myOrderDetail,
      },
      5: {
        id: '5',
        quantity: 1,
        price: '30500',
        paymentAmount: '30500',
      },
    };

    reducer({
      type: actionTypes.ORDER_DETAIL,
      payload: myOrderDetail,
    });
    expect(initialState.orderDetail).toEqual(orderDetail);
  });
});
