import { act } from "react";
import { waitFor } from "@testing-library/react";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { cartItemQuantity } from "../recoil/cartItemQuantity";
import { cartItems } from "../recoil/cartItems";
import { remoteAreaState, shippingFeeSelector } from "@/recoil/shippingFee";
import { totalOrderPriceSelector } from "@/recoil/orderInformation";

import { renderTestHook } from "./utils/renderTestHook";

import MOCK_CART_ITEMS from "./mocks/cartItem";
import { CART_FEE } from "@/constants/cart";

jest.mock("../apis/index", () => ({
  config: {
    apiUrl: "http://localhost:mock",
  },
}));

describe("cartItemState", () => {
  describe("상품 수량", () => {
    it("장바구니 상품의 초기 수량은 초기 데이터의 수량과 일치해야 한다.", () => {
      MOCK_CART_ITEMS.forEach((item) => {
        const { result } = renderTestHook(() =>
          useRecoilValue(cartItemQuantity(item.id))
        );

        expect(result.current).toBe(item.quantity);
      });
    });

    it("상품 수량을 올리면 기존 수량에서 1 증가한다.", async () => {
      const { result } = renderTestHook(() =>
        useRecoilState(cartItemQuantity(MOCK_CART_ITEMS[0].id))
      );

      const [quantity, setQuantity] = result.current;

      expect(quantity).toBe(MOCK_CART_ITEMS[0].quantity);

      act(() => {
        setQuantity((prevQuantity) => prevQuantity + 1);
      });

      await waitFor(() => {
        const [updatedQuantity] = result.current;

        expect(updatedQuantity).toBe(MOCK_CART_ITEMS[0].quantity + 1);
      });
    });
  });

  describe("상품 총 가격", () => {
    it("초기 총 가격은 모킹 데이터의 가격 총합인 80,000원이다.", () => {
      const EXPECTED_TOTAL_PRICE = 80_000;

      const { result } = renderTestHook(() =>
        useRecoilValue(totalOrderPriceSelector)
      );

      expect(result.current).toBe(EXPECTED_TOTAL_PRICE);
    });

    it("상품 개수가 변경되면 총 가격도 따라서 변경되어야 한다.", () => {
      const { result } = renderTestHook(() => {
        const totalPrice = useRecoilValue(totalOrderPriceSelector);
        const setCartItemCount = useSetRecoilState(
          cartItemQuantity(MOCK_CART_ITEMS[0].id)
        );

        return { totalPrice, setCartItemCount };
      });

      act(() => {
        result.current.setCartItemCount(2);
      });

      expect(result.current.totalPrice).toBe(90_000);

      act(() => {
        result.current.setCartItemCount(5);
      });

      expect(result.current.totalPrice).toBe(120_000);
    });
  });

  describe("배송비", () => {
    it("주문 금액이 100,000원 이하일 경우 배송비는 3,000원이다.", () => {
      const EXPECTED_TOTAL_PRICE = 80_000;

      const { result } = renderTestHook(() => {
        const shippingFee = useRecoilValue(shippingFeeSelector);
        const totalPrice = useRecoilValue(totalOrderPriceSelector);
        return { totalPrice, shippingFee };
      });

      const { totalPrice, shippingFee } = result.current;

      expect(totalPrice).toBe(EXPECTED_TOTAL_PRICE);
      expect(shippingFee).toBe(CART_FEE.shippingFee);
    });

    it("주문 금액이 100,000원 이상일 경우 배송비는 0원이다.", () => {
      const EXPECTED_SHIPPING_FEE = 0;

      const { result } = renderTestHook(() => {
        const shippingFee = useRecoilValue(shippingFeeSelector);
        const setCartItemCount = useSetRecoilState(
          cartItemQuantity(MOCK_CART_ITEMS[0].id)
        );

        return { shippingFee, setCartItemCount };
      });

      act(() => {
        result.current.setCartItemCount(4);
      });

      const { shippingFee } = result.current;

      expect(shippingFee).toBe(EXPECTED_SHIPPING_FEE);
    });

    describe("제주도 및 도서 산간 지역", () => {
      it("주문 금액이 100,000원 이하이고, 제주도 및 도서 산간 지역에 거주하는 사용자의 배송비는 6,000원이어야 한다,", async () => {
        const { result } = renderTestHook(() => {
          const shippingFee = useRecoilValue(shippingFeeSelector);
          const setIsRemoteArea = useSetRecoilState(remoteAreaState);

          return { shippingFee, setIsRemoteArea };
        });

        act(() => {
          result.current.setIsRemoteArea(true);
        });

        await waitFor(() => {
          const EXPECTED_SHIPPING_FEE = 6_000;

          const { shippingFee } = result.current;

          expect(shippingFee).toBe(EXPECTED_SHIPPING_FEE);
        });
      });

      it("주문 금액이 100,000원 이상인, 제주도 및 도서 산간 지역에 거주하는 사용자의 배송비는 0원이어야 한다,", async () => {
        const { result } = renderTestHook(() => {
          const shippingFee = useRecoilValue(shippingFeeSelector);
          const setCartItemCount = useSetRecoilState(
            cartItemQuantity(MOCK_CART_ITEMS[0].id)
          );
          const setIsRemoteArea = useSetRecoilState(remoteAreaState);

          return { shippingFee, setCartItemCount, setIsRemoteArea };
        });

        act(() => {
          result.current.setIsRemoteArea(true);
          result.current.setCartItemCount(4);
        });

        await waitFor(() => {
          const EXPECTED_SHIPPING_FEE = 0;

          const { shippingFee } = result.current;

          expect(shippingFee).toBe(EXPECTED_SHIPPING_FEE);
        });
      });
    });
  });

  describe("상품 제거", () => {
    it("상품을 삭제할 경우, 상품 갯수가 줄어든다", async () => {
      const { result } = renderTestHook(() => useRecoilState(cartItems));

      const [items, setItems] = result.current;
      expect(items.length).toBe(MOCK_CART_ITEMS.length);

      act(() => {
        setItems((prevItems) =>
          prevItems.filter((item) => item.id !== MOCK_CART_ITEMS[0].id)
        );
      });

      await waitFor(() => {
        const [updatedItems] = result.current;

        expect(updatedItems.length).toBe(MOCK_CART_ITEMS.length - 1);
      });
    });
  });
});
