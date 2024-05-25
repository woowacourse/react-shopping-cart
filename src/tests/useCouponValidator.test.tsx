// import React from "react";
// import { useCouponValidator } from "./useCouponValidator";
// import { Coupon } from "../types/coupon";

// describe("useCouponValidator", () => {
//   beforeAll(() => {
//     jest.useFakeTimers();
//     jest.setSystemTime(new Date("2024-05-20"));
//   });

//   afterAll(() => {
//     jest.useRealTimers();
//   });

//   it("만료일이 지난 쿠폰은 유효하지 않다", () => {
//     const expiredCoupon: Coupon = {
//       id: 1,
//       code: "EXPIRED_COUPON",
//       description: "만료된 쿠폰",
//       discountType: "fixed",
//       expirationDate: "2024-05-01",
//     };
//     const { isCouponValid } = useCouponValidator();
//     expect(isCouponValid(expiredCoupon)).toBe(false);
//   });
// });
