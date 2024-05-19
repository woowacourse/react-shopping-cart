import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { productsIds, totalProductQuantity } from './selectors';
import { isCheckedState } from './atoms';

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

describe('totalProductQuantity Selector 테스트', () => {
  it('아디다스 수량 3개, 리복 수량 3개가 체크 상태이고 나이키는 체크 상태가 아닐 때, 총 상품 종류는 2개이고 총 상품 수량은 6개이다.', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ content: mockData }));

    const { result } = renderHook(
      () => {
        const productIds = useRecoilValue(productsIds);
        useRecoilState(isCheckedState(172));
        useRecoilState(isCheckedState(373));
        useRecoilState(isCheckedState(200));
        const totalQuantity = useRecoilValue(totalProductQuantity);
        return { productIds, totalQuantity };
      },
      { wrapper: RecoilRoot },
    );
    await waitFor(() => {
      expect(result.current.totalQuantity).toEqual({
        totalCount: 2,
        totalQuantity: 6,
      });
    });
  });
});
