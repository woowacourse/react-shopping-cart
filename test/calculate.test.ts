import {
  calculateDeliveryFee,
  calculateOrderAmount,
  calculateTotalQuantity
} from '../src/components/CartItemList/calculate';
import { CartItemType } from '../src/types/cartItem';

const mockData: CartItemType[] = [
  {
    id: 1,
    product: {
      id: 1,
      name: '상품 이름 A',
      price: 10000,
      imageUrl: '',
      category: '패션잡화'
    },
    quantity: 3
  },
  {
    id: 2,
    product: {
      id: 1,
      name: '상품 이름 B',
      price: 15000,
      imageUrl: '',
      category: '식료품'
    },
    quantity: 2
  },
  {
    id: 3,
    product: {
      id: 103,
      name: '텀블러',
      price: 15000,
      imageUrl: '/images/tumbler.jpg',
      category: '생활용품'
    },
    quantity: 3
  }
];

describe('주문 금액·배송비·결제 금액 계산 test', () => {
  it('상품 금액을 합산한 총 주문 금액을 계산한다.', () => {
    const orderAmount = calculateOrderAmount(mockData);
    expect(orderAmount).toBe(105000);
  });

  it('상품 금액이 10만원 이상이면 배송비가 무료이다.', () => {
    const orderAmount = calculateOrderAmount(mockData);
    expect(orderAmount).toBe(105000);

    const deliveryFee = calculateDeliveryFee(orderAmount);
    expect(deliveryFee).toBe(0);
  });

  it('상품 금액이 10만원 미만이면 배송비가 3000원이다.', () => {
    const orderAmount = calculateOrderAmount([mockData[0]]);
    expect(orderAmount).toBe(30000);

    const deliveryFee = calculateDeliveryFee(orderAmount);
    expect(deliveryFee).toBe(3000);
  });

  it('총 결제 금액은 주문 금액과 배송비의 합이다.', () => {
    const orderAmount = calculateOrderAmount(mockData);
    const deliveryFee = calculateDeliveryFee(orderAmount);
    const totalPayment = orderAmount + deliveryFee;

    expect(totalPayment).toBe(105000);
  });
});

describe('총 주문 수량 test', () => {
  it('총 주문 수량을 계산한다.', () => {
    const totalQuantity = calculateTotalQuantity(mockData);
    expect(totalQuantity).toBe(8);
  });
});
