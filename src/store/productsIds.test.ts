import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { productsIds } from './selectors';

describe('productsIds Selector 테스트', () => {
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

  beforeAll(() => {
    fetchMock.enableMocks();
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('productsIds 값에는 productsState Atom에서 상품의 id로 구성된 배열이 저장된다.', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ content: mockData }));

    const { result } = renderHook(
      () => {
        const ids = useRecoilValue(productsIds);

        return { ids };
      },
      { wrapper: RecoilRoot },
    );

    await waitFor(() => {
      expect(result.current.ids).toEqual([172, 373, 200]);
    });
  });
});
