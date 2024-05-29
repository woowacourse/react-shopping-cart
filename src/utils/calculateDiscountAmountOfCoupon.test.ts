import { CartItem } from "../types/cartItems";
import {
  BOGOCoupon,
  FixedDiscountCoupon,
  FreeShippingCoupon,
  PercentageDiscountCoupon,
} from "../types/coupons";
import { calculateDiscountAmountOfCoupon } from "./calculateDiscountAmountOfCoupon";

describe("calculateDiscountAmountOfCoupon: 쿠폰 할인 금액 계산", () => {
  describe("고정 할인 쿠폰", () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it("쿠폰 적용 가능 조건이 없으면, 할인 금액을 반환한다", () => {
      const fixedDiscountCoupon: FixedDiscountCoupon = {
        id: 1,
        code: "FIXED5000",
        description: "5,000원 할인 쿠폰",
        discount: 5000,
        discountType: "fixed",
        expirationDate: "2024-11-30",
        isSelected: true,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };
      const orderAmount = 50000;
      const cartItems: CartItem[] = [
        {
          id: 1,
          quantity: 2,
          product: {
            id: 1,
            name: "리복",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: true,
        },
        {
          id: 2,
          quantity: 2,
          product: {
            id: 2,
            name: "리복2",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: false,
        },
      ];
      const deliveryCost = 3000;

      const discountAmount = calculateDiscountAmountOfCoupon(
        fixedDiscountCoupon,
        {
          orderAmount,
          cartItems,
          deliveryCost,
        }
      );

      expect(discountAmount).toBe(fixedDiscountCoupon.discount);
    });

    it("쿠폰에 최소 주문 금액 조건이 있고 해당 조건을 만족하면, 할인 금액을 반환한다", () => {
      const fixedDiscountCoupon: FixedDiscountCoupon = {
        id: 1,
        code: "FIXED5000",
        description: "5,000원 할인 쿠폰",
        discount: 5000,
        discountType: "fixed",
        minimumAmount: 100_000,
        expirationDate: "2024-11-30",
        isSelected: true,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };
      const orderAmount = 100_000;
      const cartItems: CartItem[] = [
        {
          id: 1,
          quantity: 2,
          product: {
            id: 1,
            name: "리복",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: true,
        },
        {
          id: 2,
          quantity: 2,
          product: {
            id: 2,
            name: "리복2",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: false,
        },
      ];
      const deliveryCost = 3000;

      const discountAmount = calculateDiscountAmountOfCoupon(
        fixedDiscountCoupon,
        { orderAmount, cartItems, deliveryCost }
      );

      expect(discountAmount).toBe(fixedDiscountCoupon.discount);
    });

    it("쿠폰에 최소 주문 금액 조건이 있고 해당 조건을 만족하지 못하면, 0을 반환한다", () => {
      const fixedDiscountCoupon: FixedDiscountCoupon = {
        id: 1,
        code: "FIXED5000",
        description: "5,000원 할인 쿠폰",
        discount: 5000,
        discountType: "fixed",
        minimumAmount: 100_000,
        expirationDate: "2024-11-30",
        isSelected: false,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };
      const orderAmount = 50_000;
      const cartItems: CartItem[] = [
        {
          id: 1,
          quantity: 2,
          product: {
            id: 1,
            name: "리복",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: true,
        },
        {
          id: 2,
          quantity: 2,
          product: {
            id: 2,
            name: "리복2",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: false,
        },
      ];
      const deliveryCost = 3000;

      const discountAmount = calculateDiscountAmountOfCoupon(
        fixedDiscountCoupon,
        { orderAmount, cartItems, deliveryCost }
      );

      expect(discountAmount).toBe(0);
    });

    it("쿠폰에 사용 가능 시간 조건이 있고 해당 조건을 만족하면, 할인 금액을 반환한다", () => {
      jest.setSystemTime(new Date("2024-05-20 05:00:00"));

      const fixedDiscountCoupon: FixedDiscountCoupon = {
        id: 1,
        code: "FIXED5000",
        description: "5,000원 할인 쿠폰",
        discount: 5000,
        discountType: "fixed",
        availableTime: {
          start: "04:00:00",
          end: "07:00:00",
        },
        expirationDate: "2024-11-30",
        isSelected: true,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };
      const orderAmount = 100_000;
      const cartItems: CartItem[] = [
        {
          id: 1,
          quantity: 2,
          product: {
            id: 1,
            name: "리복",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: true,
        },
        {
          id: 2,
          quantity: 2,
          product: {
            id: 2,
            name: "리복2",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: false,
        },
      ];
      const deliveryCost = 3000;

      const discountAmount = calculateDiscountAmountOfCoupon(
        fixedDiscountCoupon,
        { orderAmount, cartItems, deliveryCost }
      );

      expect(discountAmount).toBe(fixedDiscountCoupon.discount);
    });

    it("쿠폰에 사용 가능 시간 조건이 있고 해당 조건을 만족하지 못하면, 0을 반환한다", () => {
      jest.setSystemTime(new Date("2024-05-20 08:00:00"));

      const fixedDiscountCoupon: FixedDiscountCoupon = {
        id: 1,
        code: "FIXED5000",
        description: "5,000원 할인 쿠폰",
        discount: 5000,
        discountType: "fixed",
        availableTime: {
          start: "04:00:00",
          end: "07:00:00",
        },
        expirationDate: "2024-11-30",
        isSelected: true,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };
      const orderAmount = 50_000;
      const cartItems: CartItem[] = [
        {
          id: 1,
          quantity: 2,
          product: {
            id: 1,
            name: "리복",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: true,
        },
        {
          id: 2,
          quantity: 2,
          product: {
            id: 2,
            name: "리복2",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: false,
        },
      ];
      const deliveryCost = 3000;

      const discountAmount = calculateDiscountAmountOfCoupon(
        fixedDiscountCoupon,
        { orderAmount, cartItems, deliveryCost }
      );

      expect(discountAmount).toBe(0);
    });

    it("쿠폰에 사용 가능 시간 조건과 사용 가능 시간 조건이 있고 해당 조건을 만족하면, 할인 금액을 반환한다", () => {
      jest.setSystemTime(new Date("2024-05-20 05:00:00"));

      const fixedDiscountCoupon: FixedDiscountCoupon = {
        id: 1,
        code: "FIXED5000",
        description: "5,000원 할인 쿠폰",
        discount: 5000,
        discountType: "fixed",
        minimumAmount: 100_000,
        availableTime: {
          start: "04:00:00",
          end: "07:00:00",
        },
        expirationDate: "2024-11-30",
        isSelected: true,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };
      const orderAmount = 100_000;
      const cartItems: CartItem[] = [
        {
          id: 1,
          quantity: 2,
          product: {
            id: 1,
            name: "리복",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: true,
        },
        {
          id: 2,
          quantity: 2,
          product: {
            id: 2,
            name: "리복2",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: false,
        },
      ];
      const deliveryCost = 3000;

      const discountAmount = calculateDiscountAmountOfCoupon(
        fixedDiscountCoupon,
        { orderAmount, cartItems, deliveryCost }
      );

      expect(discountAmount).toBe(fixedDiscountCoupon.discount);
    });

    it("쿠폰에 사용 가능 시간 조건과 사용 가능 시간 조건이 있고 해당 조건을 만족하지 못하면, 0을 반환한다", () => {
      jest.setSystemTime(new Date("2024-05-20 08:00:00"));

      const fixedDiscountCoupon: FixedDiscountCoupon = {
        id: 1,
        code: "FIXED5000",
        description: "5,000원 할인 쿠폰",
        discount: 5000,
        discountType: "fixed",
        minimumAmount: 100_000,
        availableTime: {
          start: "04:00:00",
          end: "07:00:00",
        },
        expirationDate: "2024-11-30",
        isSelected: true,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };
      const orderAmount = 99_000;
      const cartItems: CartItem[] = [
        {
          id: 1,
          quantity: 2,
          product: {
            id: 1,
            name: "리복",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: true,
        },
        {
          id: 2,
          quantity: 2,
          product: {
            id: 2,
            name: "리복2",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: false,
        },
      ];
      const deliveryCost = 3000;

      const discountAmount = calculateDiscountAmountOfCoupon(
        fixedDiscountCoupon,
        { orderAmount, cartItems, deliveryCost }
      );

      expect(discountAmount).toBe(0);
    });
  });

  describe("비율 할인 쿠폰", () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it("쿠폰 적용 가능 조건이 없으면, 할인 금액을 반환한다", () => {
      const percentageDiscountCoupon: PercentageDiscountCoupon = {
        id: 1,
        code: "FIXED5000",
        description: "5,000원 할인 쿠폰",
        discount: 10,
        discountType: "percentage",
        expirationDate: "2024-11-30",
        isSelected: true,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };
      const orderAmount = 50000;
      const cartItems: CartItem[] = [
        {
          id: 1,
          quantity: 2,
          product: {
            id: 1,
            name: "리복",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: true,
        },
        {
          id: 2,
          quantity: 2,
          product: {
            id: 2,
            name: "리복2",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: false,
        },
      ];
      const deliveryCost = 3000;

      const discountAmount = calculateDiscountAmountOfCoupon(
        percentageDiscountCoupon,
        {
          orderAmount,
          cartItems,
          deliveryCost,
        }
      );

      expect(discountAmount).toBe(5000);
    });

    it("쿠폰에 최소 주문 금액 조건이 있고 해당 조건을 만족하면, 할인 금액을 반환한다", () => {
      const percentageDiscountCoupon: PercentageDiscountCoupon = {
        id: 1,
        code: "FIXED5000",
        description: "5,000원 할인 쿠폰",
        discount: 10,
        discountType: "percentage",
        minimumAmount: 100_000,
        expirationDate: "2024-11-30",
        isSelected: true,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };
      const orderAmount = 100_000;
      const cartItems: CartItem[] = [
        {
          id: 1,
          quantity: 2,
          product: {
            id: 1,
            name: "리복",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: true,
        },
        {
          id: 2,
          quantity: 2,
          product: {
            id: 2,
            name: "리복2",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: false,
        },
      ];
      const deliveryCost = 3000;

      const discountAmount = calculateDiscountAmountOfCoupon(
        percentageDiscountCoupon,
        { orderAmount, cartItems, deliveryCost }
      );

      expect(discountAmount).toBe(
        (orderAmount * percentageDiscountCoupon.discount) / 100
      );
    });

    it("쿠폰에 최소 주문 금액 조건이 있고 해당 조건을 만족하지 못하면, 0을 반환한다", () => {
      const percentageDiscountCoupon: PercentageDiscountCoupon = {
        id: 1,
        code: "FIXED5000",
        description: "5,000원 할인 쿠폰",
        discount: 10,
        discountType: "percentage",
        minimumAmount: 100_000,
        expirationDate: "2024-11-30",
        isSelected: false,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };
      const orderAmount = 50_000;
      const cartItems: CartItem[] = [
        {
          id: 1,
          quantity: 2,
          product: {
            id: 1,
            name: "리복",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: true,
        },
        {
          id: 2,
          quantity: 2,
          product: {
            id: 2,
            name: "리복2",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: false,
        },
      ];
      const deliveryCost = 3000;

      const discountAmount = calculateDiscountAmountOfCoupon(
        percentageDiscountCoupon,
        { orderAmount, cartItems, deliveryCost }
      );

      expect(discountAmount).toBe(0);
    });

    it("쿠폰에 사용 가능 시간 조건이 있고 해당 조건을 만족하면, 할인 금액을 반환한다", () => {
      jest.setSystemTime(new Date("2024-05-20 05:00:00"));

      const percentageDiscountCoupon: PercentageDiscountCoupon = {
        id: 1,
        code: "FIXED5000",
        description: "5,000원 할인 쿠폰",
        discount: 10,
        discountType: "percentage",
        availableTime: {
          start: "04:00:00",
          end: "07:00:00",
        },
        expirationDate: "2024-11-30",
        isSelected: true,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };
      const orderAmount = 100_000;
      const cartItems: CartItem[] = [
        {
          id: 1,
          quantity: 2,
          product: {
            id: 1,
            name: "리복",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: true,
        },
        {
          id: 2,
          quantity: 2,
          product: {
            id: 2,
            name: "리복2",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: false,
        },
      ];
      const deliveryCost = 3000;

      const discountAmount = calculateDiscountAmountOfCoupon(
        percentageDiscountCoupon,
        { orderAmount, cartItems, deliveryCost }
      );

      expect(discountAmount).toBe(
        (orderAmount * percentageDiscountCoupon.discount) / 100
      );
    });

    it("쿠폰에 사용 가능 시간 조건이 있고 해당 조건을 만족하지 못하면, 0을 반환한다", () => {
      jest.setSystemTime(new Date("2024-05-20 08:00:00"));

      const percentageDiscountCoupon: PercentageDiscountCoupon = {
        id: 1,
        code: "FIXED5000",
        description: "5,000원 할인 쿠폰",
        discount: 10,
        discountType: "percentage",
        availableTime: {
          start: "04:00:00",
          end: "07:00:00",
        },
        expirationDate: "2024-11-30",
        isSelected: true,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };
      const orderAmount = 50_000;
      const cartItems: CartItem[] = [
        {
          id: 1,
          quantity: 2,
          product: {
            id: 1,
            name: "리복",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: true,
        },
        {
          id: 2,
          quantity: 2,
          product: {
            id: 2,
            name: "리복2",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: false,
        },
      ];
      const deliveryCost = 3000;

      const discountAmount = calculateDiscountAmountOfCoupon(
        percentageDiscountCoupon,
        { orderAmount, cartItems, deliveryCost }
      );

      expect(discountAmount).toBe(0);
    });

    it("쿠폰에 사용 가능 시간 조건과 사용 가능 시간 조건이 있고 해당 조건을 만족하면, 할인 금액을 반환한다", () => {
      jest.setSystemTime(new Date("2024-05-20 05:00:00"));

      const percentageDiscountCoupon: PercentageDiscountCoupon = {
        id: 1,
        code: "FIXED5000",
        description: "5,000원 할인 쿠폰",
        discount: 10,
        discountType: "percentage",
        minimumAmount: 100_000,
        availableTime: {
          start: "04:00:00",
          end: "07:00:00",
        },
        expirationDate: "2024-11-30",
        isSelected: true,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };
      const orderAmount = 100_000;
      const cartItems: CartItem[] = [
        {
          id: 1,
          quantity: 2,
          product: {
            id: 1,
            name: "리복",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: true,
        },
        {
          id: 2,
          quantity: 2,
          product: {
            id: 2,
            name: "리복2",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: false,
        },
      ];
      const deliveryCost = 3000;

      const discountAmount = calculateDiscountAmountOfCoupon(
        percentageDiscountCoupon,
        { orderAmount, cartItems, deliveryCost }
      );

      expect(discountAmount).toBe(
        (orderAmount * percentageDiscountCoupon.discount) / 100
      );
    });

    it("쿠폰에 사용 가능 시간 조건과 사용 가능 시간 조건이 있고 해당 조건을 만족하지 못하면, 0을 반환한다", () => {
      jest.setSystemTime(new Date("2024-05-20 08:00:00"));

      const percentageDiscountCoupon: PercentageDiscountCoupon = {
        id: 1,
        code: "FIXED5000",
        description: "5,000원 할인 쿠폰",
        discount: 10,
        discountType: "percentage",
        minimumAmount: 100_000,
        availableTime: {
          start: "04:00:00",
          end: "07:00:00",
        },
        expirationDate: "2024-11-30",
        isSelected: true,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };
      const orderAmount = 99_000;
      const cartItems: CartItem[] = [
        {
          id: 1,
          quantity: 2,
          product: {
            id: 1,
            name: "리복",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: true,
        },
        {
          id: 2,
          quantity: 2,
          product: {
            id: 2,
            name: "리복2",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: false,
        },
      ];
      const deliveryCost = 3000;

      const discountAmount = calculateDiscountAmountOfCoupon(
        percentageDiscountCoupon,
        { orderAmount, cartItems, deliveryCost }
      );

      expect(discountAmount).toBe(0);
    });
  });

  describe("BOGO 할인", () => {
    it("쿠폰 적용 조건을 만족하는 상품이 여러개인 경우 1개당 금액이 가장 비싼 제품에 적용한다", () => {
      const bogoCoupon: BOGOCoupon = {
        id: 2,
        code: "BOGO",
        description: "2개 구매 시 1개 무료 쿠폰",
        discountType: "buyXgetY",
        buyQuantity: 2,
        getQuantity: 1,
        expirationDate: "2024-04-30",
        isSelected: true,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };
      const cartItems: CartItem[] = [
        {
          id: 1,
          quantity: 3,
          product: {
            id: 1,
            name: "리복",
            price: 20000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: true,
        },
        {
          id: 2,
          quantity: 4,
          product: {
            id: 2,
            name: "리복2",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: true,
        },
      ];

      const discountAmount = calculateDiscountAmountOfCoupon(bogoCoupon, {
        cartItems,
        orderAmount: 100_000,
        deliveryCost: 0,
      });

      expect(discountAmount).toBe(20_000);
    });
  });

  describe("무료 배송 할인", () => {
    it("배송비 3,000원을 반환한다", () => {
      const freeShippingCoupon: FreeShippingCoupon = {
        id: 3,
        code: "FREESHIPPING",
        description: "5만원 이상 구매 시 무료 배송 쿠폰",
        discountType: "freeShipping",
        minimumAmount: 50000,
        expirationDate: "2024-08-31",
        isSelected: true,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };
      const cartItems: CartItem[] = [
        {
          id: 1,
          quantity: 3,
          product: {
            id: 1,
            name: "리복",
            price: 20000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: true,
        },
        {
          id: 2,
          quantity: 4,
          product: {
            id: 2,
            name: "리복2",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: true,
        },
      ];

      const discountAmount = calculateDiscountAmountOfCoupon(
        freeShippingCoupon,
        {
          deliveryCost: 3_000,
          orderAmount: 50_000,
          cartItems,
        }
      );

      expect(discountAmount).toBe(3_000);
    });

    it("도서산간지역인 경우 6,000원을 반환한다", () => {
      const freeShippingCoupon: FreeShippingCoupon = {
        id: 3,
        code: "FREESHIPPING",
        description: "5만원 이상 구매 시 무료 배송 쿠폰",
        discountType: "freeShipping",
        minimumAmount: 50000,
        expirationDate: "2024-08-31",
        isSelected: true,
        isValidCoupon: true,
        isApplicableCoupon: true,
      };
      const cartItems: CartItem[] = [
        {
          id: 1,
          quantity: 3,
          product: {
            id: 1,
            name: "리복",
            price: 20000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: true,
        },
        {
          id: 2,
          quantity: 4,
          product: {
            id: 2,
            name: "리복2",
            price: 10000,
            imageUrl: "www.naver.com",
            category: "스포츠",
          },
          isSelected: true,
        },
      ];

      const discountAmount = calculateDiscountAmountOfCoupon(
        freeShippingCoupon,
        {
          deliveryCost: 6_000,
          orderAmount: 50_000,
          cartItems,
        }
      );

      expect(discountAmount).toBe(6_000);
    });
  });
});
