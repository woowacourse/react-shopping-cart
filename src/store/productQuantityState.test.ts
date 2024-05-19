import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { productQuantityState, productsIds } from './selectors';

describe('productQuantityState Selector 테스트', () => {
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

  it('productQuantityState selector에 상품 id를 넣으면 해당 상품의 수량을 저장한다.', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ content: mockData }));

    const { result } = renderHook(
      () => {
        const ids = useRecoilValue(productsIds);
        const firstQuantity = useRecoilValue(productQuantityState(ids[0]));
        const secondQuantity = useRecoilValue(productQuantityState(ids[1]));
        const thirdQuantity = useRecoilValue(productQuantityState(ids[2]));

        return { firstQuantity, secondQuantity, thirdQuantity };
      },
      { wrapper: RecoilRoot },
    );

    await waitFor(() => {
      expect(result.current.firstQuantity).toEqual(3);
      expect(result.current.secondQuantity).toEqual(3);
      expect(result.current.thirdQuantity).toEqual(5);
    });
  });
});
