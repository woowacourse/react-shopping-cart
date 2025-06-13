import { calculateBuyXGetYDiscount } from "../calculations/basic/calculateBuyXGetYDiscount";
import { CartItemWithSelection } from "../../cart/types/response";
import { Coupon } from "../types/response";

describe("calculateBuyXGetYDiscount 함수 테스트", () => {
  const baseBuyXGetYCoupon: Coupon = {
    id: 1,
    code: "BUY2GET1",
    description: "2+1 할인",
    expirationDate: "2025-12-31",
    buyQuantity: 2,
    getQuantity: 1,
    discountType: "buyXgetY",
  };

  const otherTypeCoupon: Coupon = {
    id: 2,
    code: "FIXED10000",
    description: "10,000원 할인 쿠폰",
    expirationDate: "2025-12-31",
    discount: 10000,
    minimumAmount: 100000,
    discountType: "fixed",
  };

  const createCartItems = (
    price: number,
    quantity: number
  ): CartItemWithSelection[] => [
    {
      id: 101,
      quantity,
      selected: true,
      product: {
        id: 1,
        name: "테스트 상품",
        price,
        imageUrl: "https://test.jpg",
        category: "테스트",
        stock: 100,
      },
    },
  ];

  it("BuyXGetY 타입이 아닌 쿠폰은 0을 반환한다", () => {
    const items = createCartItems(10000, 5);
    const discount = calculateBuyXGetYDiscount(otherTypeCoupon, items);

    expect(discount).toBe(0);
  });

  it("적용 가능한 상품이 없으면 0을 반환한다", () => {
    const insufficientItems = createCartItems(10000, 2);
    const discount = calculateBuyXGetYDiscount(
      baseBuyXGetYCoupon,
      insufficientItems
    );

    expect(discount).toBe(0);
  });

  it("2+1 쿠폰은 3개 구매시 1개 가격만큼 할인한다", () => {
    const items = createCartItems(10000, 3);
    const discount = calculateBuyXGetYDiscount(baseBuyXGetYCoupon, items);

    expect(discount).toBe(10000);
  });

  it("수량이 여러 세트일 경우 세트 수만큼 할인한다", () => {
    const items = createCartItems(10000, 6);
    const discount = calculateBuyXGetYDiscount(baseBuyXGetYCoupon, items);

    expect(discount).toBe(20000);
  });

  it("수량이 정확히 세트 단위가 아니어도 가능한 세트만큼 적용한다", () => {
    const items = createCartItems(10000, 7);
    const discount = calculateBuyXGetYDiscount(baseBuyXGetYCoupon, items);

    expect(discount).toBe(20000);
  });

  it("여러 상품 중 가장 비싼 상품에 할인을 적용한다", () => {
    const mixedItems: CartItemWithSelection[] = [
      {
        id: 101,
        quantity: 3,
        selected: true,
        product: {
          id: 1,
          name: "저렴한 상품",
          price: 5000,
          imageUrl: "https://cheap.jpg",
          category: "테스트",
          stock: 100,
        },
      },
      {
        id: 102,
        quantity: 3,
        selected: true,
        product: {
          id: 2,
          name: "비싼 상품",
          price: 20000,
          imageUrl: "https://expensive.jpg",
          category: "테스트",
          stock: 100,
        },
      },
    ];

    const discount = calculateBuyXGetYDiscount(baseBuyXGetYCoupon, mixedItems);

    expect(discount).toBe(20000);
  });

  it("수량 부족한 비싼 상품보다 수량 충분한 저렴한 상품에 할인이 적용된다", () => {
    const mixedItems: CartItemWithSelection[] = [
      {
        id: 101,
        quantity: 3,
        selected: true,
        product: {
          id: 1,
          name: "저렴한 상품",
          price: 5000,
          imageUrl: "https://cheap.jpg",
          category: "테스트",
          stock: 100,
        },
      },
      {
        id: 102,
        quantity: 1,
        selected: true,
        product: {
          id: 2,
          name: "비싼 상품",
          price: 20000,
          imageUrl: "https://expensive.jpg",
          category: "테스트",
          stock: 100,
        },
      },
    ];

    const discount = calculateBuyXGetYDiscount(baseBuyXGetYCoupon, mixedItems);

    expect(discount).toBe(5000);
  });

  it("buyQuantity와 getQuantity 값이 없을 경우 기본값을 사용한다", () => {
    const defaultValueCoupon: Coupon = {
      id: 3,
      code: "BUYDEFFAULT",
      description: "기본값 쿠폰",
      expirationDate: "2025-12-31",
      discountType: "buyXgetY",
      // buyQuantity 미지정 -> 기본값 2
      // getQuantity 미지정 -> 기본값 1
    };

    const items = createCartItems(10000, 3);
    const discount = calculateBuyXGetYDiscount(defaultValueCoupon, items);

    expect(discount).toBe(10000);
  });
});
