import { renderHook, waitFor } from "@testing-library/react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { cartState } from "@/store/atom/atoms";
import { server } from "@/mock/server";

const DUMMY_CART_ITEMS = [
  {
    id: 1,
    product: {
      id: 100,
      name: "abc",
      price: 20000,
      imageUrl: "",
      category: "fashion",
    },
    quantity: 4,
  },
  {
    id: 2,
    product: {
      id: 101,
      name: "def",
      price: 10000,
      imageUrl: "",
      category: "fashion",
    },
    quantity: 2,
  },
];

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
      expect(result.current.cartItems).toEqual(DUMMY_CART_ITEMS);
    });
  });
});
