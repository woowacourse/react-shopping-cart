import { CartItem } from '../../src/types';
import getCheckedItems from '../../src/utils/getCheckedItems';

describe('장바구니 목록과 선택한 id 배열을 받아 선택한 장바구니 목록을 반환하는 함수 테스트', () => {
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
    {
      id: 3,
      product: {
        id: 103,
        name: 'Item 3',
        price: 3000,
        imageUrl: 'url3',
        category: '식료품',
      },
      quantity: 5,
    },
  ];
  const checkedCartIds = [1, 3];

  it('장바구니 목록과 선택한 id 배열을 받으면 선택한 장바구니 목록을 반환한다.', () => {
    expect(getCheckedItems(mockCartItems, checkedCartIds)).toEqual([
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
        id: 3,
        product: {
          id: 103,
          name: 'Item 3',
          price: 3000,
          imageUrl: 'url3',
          category: '식료품',
        },
        quantity: 5,
      },
    ]);
  });
});
