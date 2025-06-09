import { describe, it, expect } from "vitest";
import { PercentageDiscountCoupon } from "../../../src/type/Coupons";
import { getTimes } from "../../../src/util/coupons/PercentageDiscountCoupon/getTimes";
import { validatePercentageDiscountCoupon } from "../../../src/util/coupons/PercentageDiscountCoupon/validate";

const basePercentageDiscountCoupon: PercentageDiscountCoupon = {
  id: 4,
  code: "MIRACLESALE",
  description: "미라클모닝 30% 할인 쿠폰",
  expirationDate: "2025-07-31",
  discount: 30,
  availableTime: {
    start: "04:00:00",
    end: "07:00:00",
  },
  discountType: "percentage",
};

describe("validatePercentageDiscountCoupon (미라클모닝 쿠폰)", () => {
  const {
    availableTime: { start, end },
  } = basePercentageDiscountCoupon;

  const { hour: startHour, min: startMin, sec: startSec } = getTimes(start);
  const { hour: endHour, min: endMin, sec: endSec } = getTimes(end);

  it("시작 시간과 정확히 같을 때 유효하다", () => {
    const time = { hour: startHour, min: startMin, sec: startSec };

    expect(
      validatePercentageDiscountCoupon({
        coupon: basePercentageDiscountCoupon,
        time,
      })
    ).toBe(true);
  });

  it("시작 시간보다 1초 후일 때 유효하다", () => {
    const time = { hour: startHour, min: startMin, sec: startSec + 1 };

    expect(
      validatePercentageDiscountCoupon({
        coupon: basePercentageDiscountCoupon,
        time,
      })
    ).toBe(true);
  });

  it("시작 시간보다 1초 전일 때 유효하지 않다", () => {
    let targetHour = startHour;
    let targetMin = startMin;
    let targetSec = startSec - 1;

    if (targetSec < 0) {
      targetSec = 59;
      targetMin--;
      if (targetMin < 0) {
        targetMin = 59;
        targetHour--;
      }
      if (targetHour < 0) {
        targetHour = 23;
      }
    }
    const time = { hour: targetHour, min: targetMin, sec: targetSec };

    expect(
      validatePercentageDiscountCoupon({
        coupon: basePercentageDiscountCoupon,
        time,
      })
    ).toBe(false);
  });

  it("종료 시간보다 1초 전일 때 유효하다", () => {
    let targetHour = endHour;
    let targetMin = endMin;
    let targetSec = endSec - 1;

    if (targetSec < 0) {
      targetSec = 59;
      targetMin--;
      if (targetMin < 0) {
        targetMin = 59;
        targetHour--;
      }
      if (targetHour < 0) {
        targetHour = 23;
      }
    }
    const time = { hour: targetHour, min: targetMin, sec: targetSec };

    expect(
      validatePercentageDiscountCoupon({
        coupon: basePercentageDiscountCoupon,
        time,
      })
    ).toBe(true);
  });

  it("종료 시간과 정확히 같을 때 유효하지 않다", () => {
    const time = { hour: endHour, min: endMin, sec: endSec };

    expect(
      validatePercentageDiscountCoupon({
        coupon: basePercentageDiscountCoupon,
        time,
      })
    ).toBe(false);
  });

  it("종료 시간보다 1초 후일 때 유효하지 않다", () => {
    let targetHour = endHour;
    let targetMin = endMin;
    let targetSec = endSec + 1;

    if (targetSec >= 60) {
      targetSec = targetSec % 60;
      targetMin++;
      if (targetMin >= 60) {
        targetMin = targetMin % 60;
        targetHour++;
      }
    }
    const time = { hour: targetHour, min: targetMin, sec: targetSec };

    expect(
      validatePercentageDiscountCoupon({
        coupon: basePercentageDiscountCoupon,
        time,
      })
    ).toBe(false);
  });
});
