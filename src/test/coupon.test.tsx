import { RecoilRoot, useRecoilValue } from "recoil";
import { possibleCouponListState, cartItemsState, selectedListState } from "../recoil";
import { renderHook, waitFor } from "@testing-library/react";
import { Suspense } from "react";
import { makeCartItem } from "./util";

describe("쿠폰 유효성 테스트", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2023-05-20"));
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  describe("5,000원 할인 쿠폰", () => {
    it("주문 가격이 10만원인 경우 사용 가능", async () => {
      const couponId = 1;
      const { result } = renderHook(() => useRecoilValue(possibleCouponListState), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, [makeCartItem(1234, 100000, 1)]);
              set(selectedListState, [1234]);
            }}
          >
            <Suspense>{children}</Suspense>
          </RecoilRoot>
        ),
      });

      await waitFor(() => {
        expect(result.current.includes(couponId)).toBeTruthy();
      });
    });

    it("주문 가격이 9만원인 경우 사용 불가", async () => {
      const couponId = 1;
      const { result } = renderHook(() => useRecoilValue(possibleCouponListState), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, [makeCartItem(1234, 90000, 1)]);
              set(selectedListState, [1234]);
            }}
          >
            <Suspense>{children}</Suspense>
          </RecoilRoot>
        ),
      });

      await waitFor(() => {
        expect(result.current.includes(couponId)).toBeFalsy();
      });
    });
  });

  describe("2개 구매 시 1개 무료 쿠폰", () => {
    it("3개 이상 담은 품목이 존재하는 경우 사용 가능", async () => {
      const couponId = 2;
      const { result } = renderHook(
        () => {
          return useRecoilValue(possibleCouponListState);
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(cartItemsState, [makeCartItem(1234, 10000, 3)]);
                set(selectedListState, [1234]);
              }}
            >
              <Suspense>{children}</Suspense>
            </RecoilRoot>
          ),
        }
      );

      await waitFor(() => {
        expect(result.current.includes(couponId)).toBeTruthy();
      });
    });
    it("3개 이상 담은 품목이 존재하지 않는 경우 사용 불가 ", async () => {
      const couponId = 2;
      const { result } = renderHook(() => useRecoilValue(possibleCouponListState), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, [makeCartItem(1234, 90000, 2)]);
              set(selectedListState, [1234]);
            }}
          >
            <Suspense>{children}</Suspense>
          </RecoilRoot>
        ),
      });

      await waitFor(() => {
        expect(result.current.includes(couponId)).toBeFalsy();
      });
    });
  });

  describe("5만원 이상 구매 시 무료 배송 쿠폰", () => {
    it("주문 가격이 5만원인 경우 사용 가능 ", async () => {
      const couponId = 3;
      const { result } = renderHook(() => useRecoilValue(possibleCouponListState), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, [makeCartItem(1234, 50000, 1)]);
              set(selectedListState, [1234]);
            }}
          >
            <Suspense>{children}</Suspense>
          </RecoilRoot>
        ),
      });

      await waitFor(() => {
        expect(result.current.includes(couponId)).toBeTruthy();
      });
    });

    it.only("주문 가격이 4만원인 경우 사용 불가 ", async () => {
      const couponId = 3;
      const { result } = renderHook(() => useRecoilValue(possibleCouponListState), {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartItemsState, [makeCartItem(1234, 40000, 1)]);
              set(selectedListState, [1234]);
            }}
          >
            <Suspense>{children}</Suspense>
          </RecoilRoot>
        ),
      });

      await waitFor(() => {
        expect(result.current.includes(couponId)).toBeFalsy();
      });
    });
  });

  describe("미라클모닝 30% 할인 쿠폰", () => {
    it("오전 4시에 사용 가능", async () => {
      const couponId = 4;
      const { result } = renderHook(() => useRecoilValue(possibleCouponListState), {
        wrapper: ({ children }) => (
          <RecoilRoot>
            <Suspense>{children}</Suspense>
          </RecoilRoot>
        ),
      });

      await waitFor(() => {
        expect(result.current.includes(couponId)).toBeTruthy();
      });
    });

    it("오전 8시에 사용 불가 ", async () => {
      jest.setSystemTime(new Date("2023-05-20T08:00:00"));

      const couponId = 4;
      const { result } = renderHook(
        () => {
          const a = useRecoilValue(possibleCouponListState);
          return a;
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot>
              <Suspense>{children}</Suspense>
            </RecoilRoot>
          ),
        }
      );

      await waitFor(() => {
        expect(result.current.includes(couponId)).toBeFalsy();
      });
    });
  });
});
