import { renderHook, waitFor } from "@testing-library/react";
import { fetchCartItems } from "../api/cartItems";
import { RecoilRoot, useRecoilValue } from "recoil";
import { rawCartItemsState } from "./rawCartItems";
import { Suspense } from "react";

jest.mock("../api/cartItems");

const mockFetchCartItems = fetchCartItems as jest.Mock;

describe("rawCartItemsState", () => {
  const mockCartItems = [
    {
      id: 1,
      quantity: 1,
      product: {
        id: 1,
        name: "리복",
        price: 10000,
        imageUrl: "www.naver.com",
        category: "스포츠",
      },
    },
    {
      id: 2,
      quantity: 2,
      product: {
        id: 2,
        name: "리복2",
        price: 10000,
        imageUrl: "www.naver.com",
        category: "스포츠",
      },
    },
  ];

  beforeEach(() => {
    mockFetchCartItems.mockReset();
  });

  it("초기값 세팅", async () => {
    mockFetchCartItems.mockResolvedValueOnce(mockCartItems);
    const { result } = renderHook(() => useRecoilValue(rawCartItemsState), {
      wrapper: ({ children }) => (
        <RecoilRoot>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </RecoilRoot>
      ),
    });

    await waitFor(() => {
      expect(result.current).toEqual(mockCartItems);
    });
  });
});
