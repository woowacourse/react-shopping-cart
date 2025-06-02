import { cartPrice } from './cartPrice';

describe('상품 금액 계산', () => {
  it('개별 상품의 금액을 계산한다.', () => {
    const cartItem = {
      id: 1,
      quantity: 2,
      product: {
        id: 1,
        name: '상품 1',
        price: 10000,
        imageUrl: 'https://via.placeholder.com/150',
        category: '카테고리 1',
      },
    };

    const result = cartPrice.itemPrice(cartItem);
    const expectedPrice = cartItem.quantity * cartItem.product.price;

    expect(result).toBe(expectedPrice);
  });

  it('장바구니 상품의 전체 금액을 계산한다.', () => {
    const cartList = [
      {
        id: 1,
        quantity: 2,
        product: {
          id: 1,
          name: '상품 1',
          price: 10000,
          imageUrl: 'https://via.placeholder.com/150',
          category: '카테고리 1',
        },
      },
      {
        id: 2,
        quantity: 2,
        product: {
          id: 2,
          name: '상품 1',
          price: 20000,
          imageUrl: 'https://via.placeholder.com/150',
          category: '카테고리 1',
        },
      },
    ];

    const selected = new Set(cartList.map((cartItem) => cartItem.id));

    const result = cartPrice.totalPrice(cartList, selected);

    const filtered = cartList.filter((cartItem) => selected.has(cartItem.id));
    const expectedPrice = filtered.reduce(
      (acc, curr) => acc + curr.product.price * curr.quantity,
      0
    );

    expect(result).toBe(expectedPrice);
  });
});
