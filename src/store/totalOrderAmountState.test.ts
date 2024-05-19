import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { isCheckedState, productsState } from './atoms';
import { totalOrderAmountState } from './selectors';

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
    quantity: 3,
    product: {
      id: 11,
      name: '리복',
      price: 20000,
      imageUrl: 'https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg',
      category: 'fashion',
    },
  },
  {
    id: 200,
    quantity: 5,
    product: {
      id: 13,
      name: '나이키',
      price: 10000,
      imageUrl: 'https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg',
      category: 'fashion',
    },
  },
];

describe('totalOrderAmountState Selector 테스트', () => {
  beforeAll(() => {
    fetchMock.enableMocks();
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('아디다스 3개, 리복 1개가 체크 상태이고 나이키가 체크 상태가 아닐 때, 아디다스와 리복 가격만 계산하고 10만원 미만으로 배송비를 부과한다.', async () => {
    window.localStorage.clear();
    fetchMock.mockResponseOnce(JSON.stringify({ content: mockData }));
    window.localStorage.setItem(JSON.stringify(172), JSON.stringify(true));
    window.localStorage.setItem(JSON.stringify(373), JSON.stringify(true));
    window.localStorage.setItem(JSON.stringify(200), JSON.stringify(false));

    const { result } = renderHook(
      () => {
        const products = useRecoilState(productsState);
        useRecoilState(isCheckedState(172));
        useRecoilState(isCheckedState(373));
        useRecoilState(isCheckedState(200));
        const totalOrderAmount = useRecoilValue(totalOrderAmountState);
        return { products, totalOrderAmount };
      },
      { wrapper: RecoilRoot },
    );

    await waitFor(() => {
      expect(result.current.products[0]).toEqual(mockData);
      expect(result.current.totalOrderAmount).toEqual({
        orderAmount: 66000, // (2000 * 3) + (20000 * 3) + (10000 * 0)
        deliveryCharge: 3000, // orderAmount < 100000
        totalAmount: 69000,
      });
    });
  });

  // it('아디다스 3개, 리복 1개, 나이키 5개가 체크 상태일 때, 모든 상품 가격을 계산하고, 10만원 초과로 배송비를 부과하지 않는다.', async () => {
  //   const { result } = renderHook(
  //     () => {
  //       const products = useRecoilState(productsState);
  //       useRecoilState(isCheckedState(172));
  //       useRecoilState(isCheckedState(373));
  //       useRecoilState(isCheckedState(200));
  //       const totalOrderAmount = useRecoilValue(totalOrderAmountState);
  //       return { products, totalOrderAmount };
  //     },
  //     { wrapper: RecoilRoot },
  //   );

  //   await waitFor(() => {
  //     expect(result.current.products[0]).toEqual(mockData);
  //     expect(result.current.totalOrderAmount).toEqual({
  //       orderAmount: 116000, // (2000 * 3) + (20000 * 3) + (10000 * 5)
  //       deliveryCharge: 0, // orderAmount < 100000
  //       totalAmount: 116000,
  //     });
  //   });
  // });
});
