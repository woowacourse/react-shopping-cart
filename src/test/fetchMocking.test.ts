import { renderHook, waitFor } from "@testing-library/react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { cartState } from "../store/atom/atoms";

import { server } from "./mock/server";
// import { API_TOKEN } from "../store/utils";

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
  beforeAll(async () => {
    server.listen();
  });

  beforeEach(() => {
    // server.resetHandlers();
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
