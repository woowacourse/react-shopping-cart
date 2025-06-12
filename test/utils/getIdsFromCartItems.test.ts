import { CartItem } from '../../src/types';
import getIdsFromCartItems from '../../src/utils/getIdsFromCartItems';

describe('getIdsFromCartItems 유틸 함수 테스트', () => {
  it('장바구니 아이템 배열이 주어지면 아이템의 id 배열을 반환한다.', () => {
    const mockCartItems: CartItem[] = [
      {
        id: 1,
        product: {
          id: 101,
          name: 'Item 1',
          price: 1000,
          imageUrl: 'url1',
          category: '패션잡화',
        },
        quantity: 2,
      },
      {
        id: 2,
        product: {
          id: 102,
          name: 'Item 2',
          price: 2000,
          imageUrl: 'url2',
          category: '패션잡화',
        },
        quantity: 1,
      },
    ];

    const expectedIds = [1, 2];
    const result = getIdsFromCartItems(mockCartItems);

    expect(result).toEqual(expectedIds);
  });
});
