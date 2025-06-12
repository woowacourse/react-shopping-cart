import { calculateShippingFee, canApplyShippingCoupon } from "../shippingCalculations";
import { ISOLATED_AREA_FEE, ISOLATED_AREA_THRESHOLD } from "../../constants";

describe("배송비 계산 테스트", () => {
  describe("배송비 계산 로직", () => {
    describe("일반 지역 배송", () => {
      it("10만원 미만 주문 시 3000원 배송비가 부과되어야 한다", () => {
        const result = calculateShippingFee({
          orderAmount: 50000,
          isIsolatedAreaSelected: false,
          hasShippingCoupon: false,
        });

        expect(result.fee).toBe(3000);
        expect(result.isFree).toBe(false);
      });

      it("10만원 이상 주문 시 무료 배송이어야 한다", () => {
        const result = calculateShippingFee({
          orderAmount: 150000,
          isIsolatedAreaSelected: false,
          hasShippingCoupon: false,
        });

        expect(result.fee).toBe(0);
        expect(result.isFree).toBe(true);
      });

      describe("경계값 테스트", () => {
        it("정확히 10만원 주문 시 무료 배송이어야 한다", () => {
          const result = calculateShippingFee({
            orderAmount: 100000,
            isIsolatedAreaSelected: false,
            hasShippingCoupon: false,
          });

          expect(result.fee).toBe(0);
          expect(result.isFree).toBe(true);
        });

        it("99,999원 주문 시 유료 배송이어야 한다", () => {
          const result = calculateShippingFee({
            orderAmount: 99999,
            isIsolatedAreaSelected: false,
            hasShippingCoupon: false,
          });

          expect(result.fee).toBe(3000);
          expect(result.isFree).toBe(false);
        });

        it("100,001원 주문 시 무료 배송이어야 한다", () => {
          const result = calculateShippingFee({
            orderAmount: 100001,
            isIsolatedAreaSelected: false,
            hasShippingCoupon: false,
          });

          expect(result.fee).toBe(0);
          expect(result.isFree).toBe(true);
        });
      });
    });

    describe("제주도 지역 배송", () => {
      it("10만원 미만 제주도 주문 시 6000원(일반 3000 + 제주도 3000) 배송비가 부과되어야 한다", () => {
        const result = calculateShippingFee({
          orderAmount: 50000,
          isIsolatedAreaSelected: true,
          hasShippingCoupon: false,
        });

        expect(result.fee).toBe(6000);
        expect(result.isFree).toBe(false);
      });

      it("10만원 이상 제주도 주문 시 3000원(제주도 추가비만) 배송비가 부과되어야 한다", () => {
        const result = calculateShippingFee({
          orderAmount: 150000,
          isIsolatedAreaSelected: true,
          hasShippingCoupon: false,
        });

        expect(result.fee).toBe(3000);
        expect(result.isFree).toBe(false);
      });

      describe("경계값 테스트", () => {
        it("정확히 10만원 제주도 주문 시 제주도 추가 배송비만 부과되어야 한다", () => {
          const result = calculateShippingFee({
            orderAmount: 100000,
            isIsolatedAreaSelected: true,
            hasShippingCoupon: false,
          });

          expect(result.fee).toBe(3000);
          expect(result.isFree).toBe(false);
        });
      });
    });

    describe("무료배송 쿠폰 적용", () => {
      it("무료배송 쿠폰 적용 시 모든 배송비가 0원이어야 한다", () => {
        const result = calculateShippingFee({
          orderAmount: 50000,
          isIsolatedAreaSelected: true,
          hasShippingCoupon: true,
        });

        expect(result.fee).toBe(0);
        expect(result.isFree).toBe(true);
      });

      it("무료배송 쿠폰이 있으면 주문 금액과 지역에 관계없이 무료여야 한다", () => {
        const testCases = [
          { orderAmount: 10000, isIsolatedAreaSelected: false },
          { orderAmount: 50000, isIsolatedAreaSelected: true },
          { orderAmount: 200000, isIsolatedAreaSelected: true },
        ];

        testCases.forEach(({ orderAmount, isIsolatedAreaSelected }) => {
          const result = calculateShippingFee({
            orderAmount,
            isIsolatedAreaSelected,
            hasShippingCoupon: true,
          });

          expect(result.fee).toBe(0);
          expect(result.isFree).toBe(true);
        });
      });
    });
  });

  describe("무료배송 쿠폰 적용 가능 여부", () => {
    describe("일반 지역", () => {
      it("10만원 미만 주문 시 무료배송 쿠폰 적용 가능해야 한다", () => {
        const result = canApplyShippingCoupon(50000, false);
        expect(result).toBe(true);
      });

      it("10만원 이상 주문 시 무료배송 쿠폰 적용 불가해야 한다 (이미 무료배송)", () => {
        const result = canApplyShippingCoupon(150000, false);
        expect(result).toBe(false);
      });

      describe("경계값 테스트", () => {
        it("정확히 10만원 주문 시 무료배송 쿠폰 적용 불가해야 한다", () => {
          const result = canApplyShippingCoupon(ISOLATED_AREA_THRESHOLD, false);
          expect(result).toBe(false);
        });

        it("99,999원 주문 시 무료배송 쿠폰 적용 가능해야 한다", () => {
          const result = canApplyShippingCoupon(ISOLATED_AREA_THRESHOLD - 1, false);
          expect(result).toBe(true);
        });
      });
    });

    describe("제주도 지역", () => {
      it("10만원 미만 제주도 주문 시 무료배송 쿠폰 적용 가능해야 한다", () => {
        const result = canApplyShippingCoupon(50000, true);
        expect(result).toBe(true);
      });

      it("10만원 이상 제주도 주문 시에도 무료배송 쿠폰 적용 가능해야 한다 (제주도 추가비 있음)", () => {
        const result = canApplyShippingCoupon(150000, true);
        expect(result).toBe(true);
      });

      describe("경계값 테스트", () => {
        it("정확히 10만원 제주도 주문 시 무료배송 쿠폰 적용 가능해야 한다", () => {
          const result = canApplyShippingCoupon(ISOLATED_AREA_THRESHOLD, true);
          expect(result).toBe(true);
        });
      });
    });
  });

  describe("상수값 검증", () => {
    it("제주도 추가 배송비는 3000원이어야 한다", () => {
      expect(ISOLATED_AREA_FEE).toBe(3000);
    });

    it("무료배송 기준 금액은 10만원이어야 한다", () => {
      expect(ISOLATED_AREA_THRESHOLD).toBe(100000);
    });
  });

  describe("극단값 테스트", () => {
    it("주문 금액이 0원인 경우도 처리할 수 있어야 한다", () => {
      const result = calculateShippingFee({
        orderAmount: 0,
        isIsolatedAreaSelected: false,
        hasShippingCoupon: false,
      });

      expect(result.fee).toBe(3000);
      expect(result.isFree).toBe(false);
    });

    it("매우 큰 주문 금액도 처리할 수 있어야 한다", () => {
      const result = calculateShippingFee({
        orderAmount: 999999999,
        isIsolatedAreaSelected: false,
        hasShippingCoupon: false,
      });

      expect(result.fee).toBe(0);
      expect(result.isFree).toBe(true);
    });
  });
});
