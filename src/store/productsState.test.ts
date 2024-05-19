import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { productsState } from './atoms';
import { productsIds } from './selectors';

const mockData = [
  {
    id: 172,
    quantity: 3,
    product: {
      id: 3,
      name: '아디다스',
      price: 2000,
      imageUrl: 'https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg',
      category: 'fashion',
    },
  },
  {
    id: 373,
    quantity: 1,
    product: {
      id: 11,
      name: '리복',
      price: 20000,
      imageUrl: 'https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg',
      category: 'fashion',
    },
  },
];

beforeAll(() => {
  fetchMock.enableMocks();
});

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('productsState Atom 테스트', () => {
  it('productsState Atom을 첫 호출시, "/cart-item"에 GET 요청을 보내 response를 default 값으로 받아온다.', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ content: mockData }));

    const { result } = renderHook(() => useRecoilState(productsState), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      expect(result.current[0]).not.toBe(null);
      expect(result.current[0]).not.toBe(undefined);
      expect(result.current[0]).toEqual(mockData);
    });
  });

  it('productsIds selector를 첫 호출시, productsState Atom에서 파생된 상태를 default 값으로 받아온다.', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ content: mockData }));

    const { result } = renderHook(() => useRecoilValue(productsIds), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      expect(result.current).toEqual([172, 373]);
    });
  });
});
