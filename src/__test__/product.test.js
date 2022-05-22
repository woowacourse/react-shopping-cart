import productsReducer, { initialState } from 'redux/products/productsReducer';
import ACTION_TYPE from 'redux/products/productsActions';

describe('상품을 확인할 수 있다.', () => {
  test('상품 목록을 갱신할 수 있다.', () => {
    const action = { type: ACTION_TYPE.UPDATE_PRODUCTS, payload: mockDatas };

    const newState = productsReducer(initialState, action);

    expect(newState).toEqual(mockDatas);
  });
});

const mockDatas = [
  {
    id: 1,
    image: 'https://i.pinimg.com/474x/4a/47/d5/4a47d5956eb090ff702e3b2cb47fdf98.jpg',
    name: '사과',
    price: 1000,
  },
  {
    id: 2,
    image: 'https://i.pinimg.com/474x/2a/1f/a3/2a1fa32019c657c797ba60fe809e5550.jpg',
    name: '포도',
    price: 3500,
  },
  {
    id: 3,
    image: 'https://i.pinimg.com/474x/49/56/60/495660773a9f824050939004f795f4b4.jpg',
    name: '바나나',
    price: 1000,
  },
  {
    id: 4,
    image: 'https://i.pinimg.com/474x/9f/c7/82/9fc782cbd4bf1cdc719c788b250eafac.jpg',
    name: '망고',
    price: 2000,
  },
  {
    id: 5,
    image: 'https://i.pinimg.com/474x/c7/9f/9f/c79f9fec3019ef6176b04f03d3e342e7.jpg',
    name: '수박',
    price: 10000,
  },
];
