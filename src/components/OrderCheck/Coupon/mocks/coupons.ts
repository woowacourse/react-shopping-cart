interface CouponType {
  id: number;
  title: string;
  expiry: string;
  minOrder?: string;
  info?: string;
}

export const coupons: CouponType[] = [
  {
    id: 1,
    title: "5,000원 할인 쿠폰",
    expiry: "만료일: 2024년 11월 30일",
    minOrder: "최소 주문 금액: 100,000원",
  },
  {
    id: 2,
    title: "2개 구매 시 1개 무료 쿠폰",
    expiry: "만료일: 2024년 5월 30일",
  },
  {
    id: 3,
    title: "5만원 이상 구매 시 무료 배송 쿠폰",
    expiry: "만료일: 2024년 8월 31일",
    minOrder: "최소 주문 금액: 50,000원",
  },
  {
    id: 4,
    title: "미라클모닝 30% 할인 쿠폰",
    expiry: "만료일: 2024년 7월 31일",
    info: "사용 가능 시간: 오전 4시~7시",
  },
];
