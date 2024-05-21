import { renderHook, waitFor } from "@testing-library/react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { cartState } from "@/store/atom/atoms";
import { server } from "@/mock/server";
import { couponsDummy, freeShippingDummy } from "@/mock/dummy";

describe("fetchMocking테스트", () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it("cartState Fetching 모킹 테스트", async () => {
    const { result } = renderHook(
      () => {
        const cartItems = useRecoilValue(cartState);
        return {
          cartItems,
        };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    await waitFor(() => {
      expect(result.current.cartItems).toEqual(freeShippingDummy.content);
    });
  });

  it("couponsState 모킹 테스트", async () => {
    const { result } = renderHook(
      () => {
        const coupons = useRecoilValue(couponsState);
        return {
          coupons,
        };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    await waitFor(() => {
      expect(result.current.coupons).toEqual(couponsDummy);
    });
  });
});
