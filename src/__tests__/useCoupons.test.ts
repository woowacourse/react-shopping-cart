import { renderHook, waitFor } from "@testing-library/react";
import { Coupon } from "../types/response";
import { getCoupons } from "../apis/coupons/getCoupons";
import useCoupons from "../hooks/useCoupons";

const mockCoupons: Coupon[] = [
  {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    expirationDate: "2025-11-30",
    discount: 5000,
    minimumAmount: 100000,
    discountType: "fixed",
  },
  {
    id: 2,
    code: "BOGO",
    description: "2개 구매 시 1개 무료 쿠폰",
    expirationDate: "2025-06-30",
    buyQuantity: 2,
    getQuantity: 1,
    discountType: "buyXgetY",
  },
  {
    id: 3,
    code: "FREESHIPPING",
    description: "5만원 이상 구매 시 무료 배송 쿠폰",
    expirationDate: "2025-08-31",
    minimumAmount: 50000,
    discountType: "freeShipping",
  },
  {
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
  },
];

const mockCartItems = [
  {
    id: 1,
    quantity: 3,
    name: "유기농 바나나",
    imageUrl: "",
    price: 10000,
    checked: true,
  },
];

jest.mock("../apis/coupons/getCoupons", () => ({
  getCoupons: jest.fn(),
}));

jest.mock("../hooks/useCart", () => () => ({
  cartItemsCheckData: mockCartItems,
}));

jest.mock("../hooks/useCartCalculations", () => () => ({
  orderPrice: 100000,
  shippingFee: 3000,
}));

const mockUseCart = {
  cartItemsCheckData: mockCartItems,
  isRemoteArea: false,
};

const mockUseCartCalculations = {
  orderPrice: 100000,
  shippingFee: 3000,
};

describe("useCoupons 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getCoupons as jest.Mock).mockResolvedValue(mockCoupons);
  });

  it("FIXED5000 쿠폰은 10만원 이상일 때 5000원 할인", async () => {
    const { result } = renderHook(() => useCoupons());

    await waitFor(() => {
      expect(getCoupons).toHaveBeenCalled();
    });

    const { applyCoupons } = result.current;

    const { totalDiscount } = applyCoupons([
      {
        id: 1,
        code: "FIXED5000",
        description: "5,000원 할인 쿠폰",
        expirationDate: "2025-11-30",
        discount: 5000,
        minimumAmount: 100000,
        discountType: "fixed",
      },
    ]);

    expect(totalDiscount).toBe(5000);
  });

  it("BOGO 쿠폰은 동일 상품 2개 이상일 때 1개 무료", async () => {
    const { result } = renderHook(() => useCoupons());

    await waitFor(() => {
      expect(getCoupons).toHaveBeenCalled();
    });

    const { applyCoupons } = result.current;

    const { totalDiscount } = applyCoupons([
      {
        id: 2,
        code: "BOGO",
        description: "2개 구매 시 1개 무료 쿠폰",
        expirationDate: "2025-06-30",
        buyQuantity: 2,
        getQuantity: 1,
        discountType: "buyXgetY",
      },
    ]);

    expect(totalDiscount).toBe(10000);
  });

  it("FREESHIPPING 쿠폰은 5만원 이상일 때 무료 배송", async () => {
    mockUseCartCalculations.orderPrice = 50000;
    mockUseCartCalculations.shippingFee = 3000;

    const { result } = renderHook(() => useCoupons());

    await waitFor(() => {
      expect(getCoupons).toHaveBeenCalled();
    });

    const { applyCoupons } = result.current;

    jest.mock("../hooks/useCartCalculations", () => () => ({
      orderPrice: 50000,
      shippingFee: 3000,
    }));

    const { totalDiscount } = applyCoupons([
      {
        id: 3,
        code: "FREESHIPPING",
        description: "5만원 이상 구매 시 무료 배송 쿠폰",
        expirationDate: "2025-08-31",
        minimumAmount: 50000,
        discountType: "freeShipping",
      },
    ]);

    expect(totalDiscount).toBe(3000);
  });

  it("MIRACLESALE 쿠폰은 오전 4시부터 7시 사이에만 사용 가능", async () => {
    const { result } = renderHook(() => useCoupons());

    await waitFor(() => {
      expect(getCoupons).toHaveBeenCalled();
    });

    const { applyCoupons } = result.current;

    jest.useFakeTimers().setSystemTime(new Date("2025-06-08T05:30:00"));

    const { totalDiscount } = applyCoupons([
      {
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
      },
    ]);

    expect(totalDiscount).toBe(30000);

    jest.restoreAllMocks();
  });

  describe("쿠폰 조합 테스트", () => {
    it("미라클 모닝 + FIXED5000 쿠폰 조합", async () => {
      const { result } = renderHook(() => useCoupons());

      await waitFor(() => {
        expect(getCoupons).toHaveBeenCalled();
      });

      const { applyCoupons } = result.current;

      jest.useFakeTimers().setSystemTime(new Date("2025-06-08T05:30:00"));

      const { totalDiscount } = applyCoupons([
        {
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
        },
        {
          id: 1,
          code: "FIXED5000",
          description: "5,000원 할인 쿠폰",
          expirationDate: "2025-11-30",
          discount: 5000,
          minimumAmount: 100000,
          discountType: "fixed",
        },
      ]);

      expect(totalDiscount).toBe(35000);

      jest.restoreAllMocks();
    });

    it("FIXED5000 + BOGO 쿠폰 조합", async () => {
      const { result } = renderHook(() => useCoupons());

      await waitFor(() => {
        expect(getCoupons).toHaveBeenCalled();
      });

      const { applyCoupons } = result.current;

      const { totalDiscount } = applyCoupons([
        {
          id: 1,
          code: "FIXED5000",
          description: "5,000원 할인 쿠폰",
          expirationDate: "2025-11-30",
          discount: 5000,
          minimumAmount: 100000,
          discountType: "fixed",
        },
        {
          id: 2,
          code: "BOGO",
          description: "2개 구매 시 1개 무료 쿠폰",
          expirationDate: "2025-06-30",
          buyQuantity: 2,
          getQuantity: 1,
          discountType: "buyXgetY",
        },
      ]);

      expect(totalDiscount).toBe(15000);
    });

    it("미라클 모닝 + FIXED5000 + FREESHIPPING 쿠폰 조합", async () => {
      const { result } = renderHook(() => useCoupons());

      await waitFor(() => {
        expect(getCoupons).toHaveBeenCalled();
      });

      const { applyCoupons } = result.current;

      jest.useFakeTimers().setSystemTime(new Date("2025-06-08T05:30:00"));

      const { totalDiscount, appliedCoupons } = applyCoupons([
        {
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
        },
        {
          id: 1,
          code: "FIXED5000",
          description: "5,000원 할인 쿠폰",
          expirationDate: "2025-11-30",
          discount: 5000,
          minimumAmount: 100000,
          discountType: "fixed",
        },
        {
          id: 3,
          code: "FREESHIPPING",
          description: "5만원 이상 구매 시 무료 배송 쿠폰",
          expirationDate: "2025-08-31",
          minimumAmount: 50000,
          discountType: "freeShipping",
        },
      ]);

      expect(totalDiscount).toBe(35000);
      expect(appliedCoupons).toHaveLength(2);
      expect(appliedCoupons.map((coupon) => coupon.code)).toEqual(
        expect.arrayContaining(["MIRACLESALE", "FIXED5000"])
      );

      jest.restoreAllMocks();
    });

    it("모든 쿠폰이 가능할 때 최대 할인 조합 선택", async () => {
      const { result } = renderHook(() => useCoupons());

      await waitFor(() => {
        expect(getCoupons).toHaveBeenCalled();
      });

      const { applyCoupons } = result.current;

      jest.useFakeTimers().setSystemTime(new Date("2025-06-08T05:30:00"));
      const { totalDiscount, appliedCoupons } = applyCoupons([
        {
          id: 1,
          code: "FIXED5000",
          description: "5,000원 할인 쿠폰",
          expirationDate: "2025-11-30",
          discount: 5000,
          minimumAmount: 100000,
          discountType: "fixed",
        },
        {
          id: 2,
          code: "BOGO",
          description: "2개 구매 시 1개 무료 쿠폰",
          expirationDate: "2025-06-30",
          buyQuantity: 2,
          getQuantity: 1,
          discountType: "buyXgetY",
        },
        {
          id: 3,
          code: "FREESHIPPING",
          description: "5만원 이상 구매 시 무료 배송 쿠폰",
          expirationDate: "2025-08-31",
          minimumAmount: 50000,
          discountType: "freeShipping",
        },
        {
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
        },
      ]);

      expect(appliedCoupons.map((coupon) => coupon.code)).toEqual(
        expect.arrayContaining(["BOGO", "MIRACLESALE"])
      );
      expect(totalDiscount).toBe(40000);
      expect(appliedCoupons).toHaveLength(2);

      jest.restoreAllMocks();
    });

    describe("무료 배송 쿠폰 테스트", () => {
      it("도서 산간 지역이고 주문 금액 10만원 미만일 때 무료 배송 쿠폰 적용", async () => {
        mockUseCart.isRemoteArea = true;
        mockUseCartCalculations.orderPrice = 80000;
        mockUseCartCalculations.shippingFee = 6000;

        const { result } = renderHook(() => useCoupons());

        await waitFor(() => {
          expect(getCoupons).toHaveBeenCalled();
        });

        const { applyCoupons } = result.current;

        const { totalDiscount } = applyCoupons([
          {
            id: 3,
            code: "FREESHIPPING",
            description: "5만원 이상 구매 시 무료 배송 쿠폰",
            expirationDate: "2025-08-31",
            minimumAmount: 50000,
            discountType: "freeShipping",
          },
        ]);

        expect(totalDiscount).toBe(6000);
      });

      it("일반 지역이고 주문 금액 10만원 미만일 때 무료 배송 쿠폰 적용", async () => {
        mockUseCart.isRemoteArea = false;
        mockUseCartCalculations.orderPrice = 80000;
        mockUseCartCalculations.shippingFee = 3000;

        const { result } = renderHook(() => useCoupons());

        await waitFor(() => {
          expect(getCoupons).toHaveBeenCalled();
        });

        const { applyCoupons } = result.current;

        const { totalDiscount } = applyCoupons([
          {
            id: 3,
            code: "FREESHIPPING",
            description: "5만원 이상 구매 시 무료 배송 쿠폰",
            expirationDate: "2025-08-31",
            minimumAmount: 50000,
            discountType: "freeShipping",
          },
        ]);

        expect(totalDiscount).toBe(3000);
      });
    });
  });
});
