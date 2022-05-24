import cartReducer, {ACTION} from 'store/cart';

const initialState = {
  pending: false,
  error: false,
  data: [],
};

describe('cart reducer test', () => {
  const reducer = (action) => cartReducer(initialState, action);

  const mockCart = [
    {
      id: 2,
      name: '국내산 방울토마토 1팩(2kg내외)',
      image:
        'https://cdn-mart.baemin.com/sellergoods/main/5d038bda-81f7-4b0d-b833-59544ff2c968.png',
      price: 12500,
    },
  ];

  it('카트 불러오기 요청이 일어나면 카트 상품 목록을 불러온다', () => {
    const {data: fetchedData} = reducer({type: ACTION.GET_CART_SUCCESS, payload: mockCart});
    expect(fetchedData).toEqual(mockCart);
  });
});
