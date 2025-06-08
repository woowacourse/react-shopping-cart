import { describe, it, expect } from "vitest";
import {
  validateDate,
  validateMinimumAmount,
  validateTime,
  validateTwoPlusOne,
} from "./validateCoupons";

import { AvailableTime } from "../../types/coupon";
import { CartItemTypes } from "../../../shopping-cart/types/cartItem";

describe("validateDate", () => {
  it("만료일이 오늘보다 미래면 true", () => {
    const result = validateDate({
      expirationDate: "2099-12-31",
      today: new Date("2025-06-01"),
    });
    expect(result).toBe(true);
  });

  it("만료일이 과거면 false", () => {
    const result = validateDate({
      expirationDate: "2000-01-01",
      today: new Date("2025-06-01"),
    });
    expect(result).toBe(false);
  });

  it("만료일이 오늘과 같으면 true", () => {
    const result = validateDate({
      expirationDate: "2025-06-01",
      today: new Date("2025-06-01"),
    });
    expect(result).toBe(true);
  });
});

describe("validateTime", () => {
  it("현재 시간이 사용 가능 시간 범위 안이면 true", () => {
    const today = new Date("2025-06-01T06:30:00");
    const availableTime: AvailableTime = {
      start: "06:00:00",
      end: "07:00:00",
    };
    const result = validateTime({ availableTime, today });
    expect(result).toBe(true);
  });

  it("현재 시간이 사용 가능 시간 밖이면 false", () => {
    const today = new Date("2025-06-01T08:30:00");
    const availableTime: AvailableTime = {
      start: "06:00:00",
      end: "07:00:00",
    };
    const result = validateTime({ availableTime, today });
    expect(result).toBe(false);
  });

  it("현재 시간이 시작 시간과 같으면 true (경계값)", () => {
    const today = new Date("2025-06-01T06:00:00");
    const availableTime: AvailableTime = {
      start: "06:00:00",
      end: "07:00:00",
    };
    const result = validateTime({ availableTime, today });
    expect(result).toBe(true);
  });

  it("현재 시간이 종료 시간과 같으면 true (경계값)", () => {
    const today = new Date("2025-06-01T07:00:00");
    const availableTime: AvailableTime = {
      start: "06:00:00",
      end: "07:00:00",
    };
    const result = validateTime({ availableTime, today });
    expect(result).toBe(true);
  });

  it("현재 시간이 시작 시간보다 1초 빠르면 false (경계값)", () => {
    const today = new Date("2025-06-01T05:59:59");
    const availableTime: AvailableTime = {
      start: "06:00:00",
      end: "07:00:00",
    };
    const result = validateTime({ availableTime, today });
    expect(result).toBe(false);
  });

  it("현재 시간이 종료 시간보다 1분 늦으면 false (경계값)", () => {
    const today = new Date("2025-06-01T07:01:00");
    const availableTime: AvailableTime = {
      start: "06:00:00",
      end: "07:00:00",
    };
    const result = validateTime({ availableTime, today });
    expect(result).toBe(false);
  });
});

describe("validateMinimumAmount", () => {
  it("주문 금액이 최소 금액 이상이면 true", () => {
    const result = validateMinimumAmount({
      minimumAmount: 5000,
      orderPrice: 6000,
    });
    expect(result).toBe(true);
  });

  it("주문 금액이 부족하면 false", () => {
    const result = validateMinimumAmount({
      minimumAmount: 10000,
      orderPrice: 8000,
    });
    expect(result).toBe(false);
  });
});

describe("validateTwoPlusOne", () => {
  it("2+1 가능한 수량이 담긴 item이 존재한다면 true", () => {
    const twoPlusOneApplicableItems: CartItemTypes[] = [
      {
        id: 2,
        quantity: 2,
        product: {
          id: 2,
          name: "상품2",
          price: 2000,
          imageUrl: "https://example.com/image2.jpg",
        },
      },
    ];
    const result = validateTwoPlusOne({ twoPlusOneApplicableItems });
    expect(result).toBe(true);
  });

  it("2+1 가능한 수량이 담긴 item이 없다면 false", () => {
    const twoPlusOneApplicableItems: CartItemTypes[] = [];
    const result = validateTwoPlusOne({ twoPlusOneApplicableItems });
    expect(result).toBe(false);
  });
});
