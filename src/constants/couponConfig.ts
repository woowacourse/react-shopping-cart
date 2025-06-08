export const coupons = [
  {
    id: 'FIXED5000',
    name: '5,000원 할인 쿠폰',
    minimumOrderAmount: 100000,
    discountAmount: 5000,
    description: '최소 주문 금액: 100,000원',
    expirationDate: '2025-11-30',
  },
  {
    id: 'BOGO',
    name: '2+1 쿠폰',
    expirationDate: '2025-06-30',
  },
  {
    id: 'FREESHIPPING',
    name: '무료 배송 쿠폰',
    minimumOrderAmount: 50000,
    description: '최소 주문 금액: 50,000원',
    expirationDate: '2025-08-31',
  },
  {
    id: 'MIRACLESALE',
    name: '30% 시간제 할인 쿠폰',
    discountRate: 0.3,
    applicableTime: '04:00 ~ 07:00',
    expirationDate: '2025-07-31',
    description: '사용 가능 시간: 오전 4시부터 7시까지',
  },
];
