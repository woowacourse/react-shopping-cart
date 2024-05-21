import { RecoilRoot, useRecoilValue } from "recoil";
import { cartItemsState, cartPriceState } from "./selectors";
import { renderHook, waitFor } from "@testing-library/react";
// import { getCartItems } from "../../apis";
import { Suspense } from "react";
// import { isSelectedState } from "../atoms/atoms";

const cartsJson = {
  content: [
    {
      id: 1274,
      quantity: 5,
      product: {
        id: 2,
        name: "나이키",
        price: 1000,
        imageUrl:
          "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png",
        category: "fashion",
      },
    },
    {
      id: 1284,
      quantity: 1,
      product: {
        id: 12,
        name: "컨버스",
        price: 20000,
        imageUrl:
          "https://sitem.ssgcdn.com/65/73/69/item/1000163697365_i1_750.jpg",
        category: "fashion",
      },
    },
  ],
};

jest.mock("../../apis", () => ({
  getCartItems: jest.fn().mockImplementation(() => Promise.resolve(cartsJson)),
}));

localStorage.getItem = jest.fn().mockResolvedValue([1284, 1274]);

describe("장바구니", () => {
  it("장바구니 데이터 로딩.", async () => {
    const { result } = renderHook(() => useRecoilValue(cartItemsState), {
      wrapper: ({ children }) => (
        <RecoilRoot>
          <Suspense>{children}</Suspense>
        </RecoilRoot>
      ),
    });

    await waitFor(() => {
      expect(result.current).toEqual(cartsJson);
    });
  });

  it("장바구니 가격 측정", async () => {
    const expectedOrderPrice = 1000 * 5 + 20000 * 1;
    const expectedDeliveryFee = 3000;
    const expectedTotalPrice = expectedOrderPrice + expectedDeliveryFee;

    const { result } = renderHook(() => useRecoilValue(cartPriceState), {
      wrapper: ({ children }) => (
        <RecoilRoot>
          <Suspense>{children}</Suspense>
        </RecoilRoot>
      ),
    });

    await waitFor(() => {
      expect(result.current.orderPrice).toBe(expectedOrderPrice);
      expect(result.current.deliveryFee).toBe(expectedDeliveryFee);
      expect(result.current.totalPrice).toBe(expectedTotalPrice);
    });
  });
});
