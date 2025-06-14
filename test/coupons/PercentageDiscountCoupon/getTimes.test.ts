import { describe, it, expect } from "vitest";
import { getTimes } from "../../../src/util/coupons/PercentageDiscountCoupon/getTimes";

describe("getTimes", () => {
  it('정확한 시간 문자열을 올바르게 파싱해야 한다 (예: "04:00:00")', () => {
    const timeString = "04:00:00";
    expect(getTimes(timeString)).toEqual({ hour: 4, min: 0, sec: 0 });
  });

  it('두 자리 숫자 시간 문자열을 올바르게 파싱해야 한다 (예: "12:34:56")', () => {
    const timeString = "12:34:56";
    expect(getTimes(timeString)).toEqual({ hour: 12, min: 34, sec: 56 });
  });

  it('자정 시간 "00:00:00"을 올바르게 파싱해야 한다', () => {
    const timeString = "00:00:00";
    expect(getTimes(timeString)).toEqual({ hour: 0, min: 0, sec: 0 });
  });

  it('하루의 끝 시간 "23:59:59"를 올바르게 파싱해야 한다', () => {
    const timeString = "23:59:59";
    expect(getTimes(timeString)).toEqual({ hour: 23, min: 59, sec: 59 });
  });
});
