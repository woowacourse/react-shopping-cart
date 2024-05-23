import {
  calculateBuyXGetYDiscountAmount,
  calculateFixedDiscountAmount,
  calculateFreeShippingDiscountAmount,
  calculatePercentageDiscountAmount,
} from ".";
import { CartItem } from "../../../types/cartItems";
import { TEST_COUPON } from "./discountCalculators.testData";

describe("Discount Calculators", () => {
  describe("calculateFixedDiscountAmount", () => {
    it("고정 할인 금액을 반환한다.", () => {
      expect(calculateFixedDiscountAmount(TEST_COUPON.fixed5000)).toBe(5000);
    });
  });

  describe("calculatePercentageDiscountAmount", () => {
    it("주문 금액에 할인 비율을 적용하여 반환한다.", () => {
      const ORDER_AMOUNT = 1000;

      expect(calculatePercentageDiscountAmount(TEST_COUPON.percentage10, ORDER_AMOUNT)).toBe(100);
    });

    it("계산된 할인 금액에 10 단위 미만의 수가 있을 경우 10 단위로 내림한다.", () => {
      const ORDER_AMOUNT = 1234;

      expect(calculatePercentageDiscountAmount(TEST_COUPON.percentage10, ORDER_AMOUNT)).toBe(120);
    });
  });

  describe("calculateBuyXGetYDiscountAmount", () => {
    const DUMMY_PRODUCT = {
      id: 1,
      name: "product",
      imageUrl: "imageUrl",
      category: "category",
      price: 1000,
    };

    const cartItems: CartItem[] = [
      {
        id: 1,
        isSelected: true,
        quantity: 3,
        product: { ...DUMMY_PRODUCT, price: 1000 },
      },
      {
        id: 2,
        isSelected: true,
        quantity: 3,
        product: { ...DUMMY_PRODUCT, price: 2000 },
      },
      {
        id: 3,
        isSelected: true,
        quantity: 3,
        product: { ...DUMMY_PRODUCT, price: 3000 },
      },
    ];

    it("할인 적용 대상의 장바구니 상품 중 할인 금액이 가장 비싼 상품 가격을 반환한다.", () => {
      expect(calculateBuyXGetYDiscountAmount(TEST_COUPON.buy2Get1, cartItems)).toBe(3000);
    });

    it("할인 적용 대상 장바구니 상품이 없을 경우 0을 반환한다. ", () => {
      const cartItems: CartItem[] = [
        { id: 1, isSelected: true, quantity: 1, product: DUMMY_PRODUCT },
        { id: 2, isSelected: true, quantity: 2, product: DUMMY_PRODUCT },
      ];

      expect(calculateBuyXGetYDiscountAmount(TEST_COUPON.buy2Get1, cartItems)).toBe(0);
    });
  });

  describe("calculateFreeShippingDiscountAmount", () => {
    it("배송비를 반환한다.", () => {
      const SHIPPING_COST = 3000;

      expect(calculateFreeShippingDiscountAmount(SHIPPING_COST)).toBe(SHIPPING_COST);
    });
  });
});
