import { act } from "react";

import { waitFor, renderHook } from "@testing-library/react";

import {
  SetRecoilState,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { RecoilRoot } from "recoil";
import { selectedCartItems } from "../recoil/selectedCardItems";
import { cartItemQuantity } from "../recoil/cartItemQuantity";
import { cartItems } from "../recoil/cartItems";
import {
  totalOrderPriceSelector,
  shippingFeeSelector,
} from "@/recoil/orderInformation";

import mockedCartItemList from "./mock";

import { CART_FEE } from "@/constants/cart";

jest.mock("../apis/index", () => ({
  config: {
    apiUrl: "http://localhost:mock",
  },
}));

const initializeState = ({ set }: { set: SetRecoilState }) => {
  set(cartItems, mockedCartItemList);

  mockedCartItemList.forEach((item) => {
    set(selectedCartItems(item.id), true);
    set(cartItemQuantity(item.id), item.quantity);
  });
};

describe("cartItemState", () => {
  const RecoilTestWrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>;

  describe("상품 수량", () => {
    it("장바구니 상품의 초기 수량은 초기 데이터의 수량과 일치해야 한다.", () => {
      mockedCartItemList.forEach((item) => {
        const { result } = renderHook(
          () => useRecoilValue(cartItemQuantity(item.id)),
          {
            wrapper: RecoilTestWrapper,
          }
        );

        expect(result.current).toBe(item.quantity);
      });
    });

    it("상품 수량을 올리면 기존 수량에서 1 증가한다.", async () => {
      const { result } = renderHook(
        () => useRecoilState(cartItemQuantity(mockedCartItemList[0].id)),
        {
          wrapper: RecoilTestWrapper,
        }
      );

      const [quantity, setQuantity] = result.current;

      expect(quantity).toBe(mockedCartItemList[0].quantity);

      act(() => {
        setQuantity((prevQuantity) => prevQuantity + 1);
      });

      await waitFor(() => {
        const [updatedQuantity] = result.current;
        expect(updatedQuantity).toBe(mockedCartItemList[0].quantity + 1); // 기존 수량에서 1 증가하는지 확인한다.
      });
    });
  });

  describe("상품 총 가격", () => {
    it("초기 총 가격은 모킹 데이터의 가격 총합인 60,000원이다.", () => {
      const EXPECTED_TOTAL_PRICE = 60_000;

      const { result } = renderHook(
        () => useRecoilValue(totalOrderPriceSelector),
        {
          wrapper: RecoilTestWrapper,
        }
      );

      expect(result.current).toBe(EXPECTED_TOTAL_PRICE);
    });

    it("상품 개수가 변경되면 총 가격도 따라서 변경되어야 한다.", () => {
      const { result } = renderHook(
        () => {
          const totalPrice = useRecoilValue(totalOrderPriceSelector);
          const setCartItemCount = useSetRecoilState(
            cartItemQuantity(mockedCartItemList[0].id)
          );

          return { totalPrice, setCartItemCount };
        },
        {
          wrapper: RecoilTestWrapper,
        }
      );

      act(() => {
        result.current.setCartItemCount(2); // 가격이 10_000인 상품의 수량을 2로 변경한다.;
      });
      expect(result.current.totalPrice).toBe(70_000); // 60_000 + 10_000

      act(() => {
        result.current.setCartItemCount(5); // 가격이 10_000인 상품의 수량을 5로 변경한다.;
      });
      expect(result.current.totalPrice).toBe(100_000); // 60_000 + 40_000
    });
  });

  describe("배송비", () => {
    it("상품 총 가격이 100,000원 이하일 경우 배송비는 3,000원이다.", () => {
      const EXPECTED_TOTAL_PRICE = 60_000;

      const { result } = renderHook(
        () => {
          const shippingFee = useRecoilValue(shippingFeeSelector);
          const totalPrice = useRecoilValue(totalOrderPriceSelector);
          return { totalPrice, shippingFee };
        },
        {
          wrapper: RecoilTestWrapper,
        }
      );

      const { totalPrice, shippingFee } = result.current;

      expect(totalPrice).toBe(EXPECTED_TOTAL_PRICE);
      expect(shippingFee).toBe(CART_FEE.shippingFee);
    });

    it("상품 총 가격이 100,000원 이상일 경우 배송비는 0원이다.", () => {
      const EXPECTED_TOTAL_PRICE = 100_000;
      const EXPECTED_SHIPPING_FEE = 0;

      const { result } = renderHook(
        () => {
          const shippingFee = useRecoilValue(shippingFeeSelector);
          const totalPrice = useRecoilValue(totalOrderPriceSelector);
          const setCartItemCount = useSetRecoilState(
            cartItemQuantity(mockedCartItemList[0].id)
          );

          return { totalPrice, shippingFee, setCartItemCount };
        },
        {
          wrapper: RecoilTestWrapper,
        }
      );

      act(() => {
        result.current.setCartItemCount(5); // 가격이 10_000인 상품의 수량을 5로 변경한다.;
      });

      const { totalPrice, shippingFee } = result.current;

      expect(totalPrice).toBe(EXPECTED_TOTAL_PRICE);
      expect(shippingFee).toBe(EXPECTED_SHIPPING_FEE);
    });
  });

  describe("상품 제거", () => {
    it("상품을 삭제할 경우, 상품 갯수가 줄어든다", async () => {
      const { result } = renderHook(() => useRecoilState(cartItems), {
        wrapper: RecoilTestWrapper,
      });

      const [items, setItems] = result.current;
      expect(items.length).toBe(mockedCartItemList.length);

      act(() => {
        setItems((prevItems) =>
          prevItems.filter((item) => item.id !== mockedCartItemList[0].id)
        );
      });

      await waitFor(() => {
        const [updatedItems] = result.current;
        expect(updatedItems.length).toBe(mockedCartItemList.length - 1);
      });
    });
  });
});
