import { renderHook, act } from "@testing-library/react";
import { RecoilRoot, SetRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  checkedCartItemsQuantityState,
  setCartPriceAndQuantitySelector,
  totalCheckedCartItemsPriceState,
} from "./selectors";
import { cartItemPriceStates, cartItemQuantityStates, checkedCartItemsState } from "./atoms";
import { mockedCartItems } from "../mock/mockData";

const initialState = ({ set }: { set: SetRecoilState }) => {
  set(setCartPriceAndQuantitySelector, mockedCartItems);
};

describe("Selector 테스트", () => {
  describe("setCartPriceAndQuantitySelector 테스트", () => {
    it.each([
      [786, 17, 2000],
      [787, 7, 20000],
    ])(
      "id: %d 에 대한 가격, 개수가 atom에 저장되는지 테스트",
      async (itemId: number, itemQuantity: number, itemPrice: number) => {
        const { result } = renderHook(
          () => {
            const itemQuantity = useRecoilValue(cartItemQuantityStates(itemId));
            const itemPrice = useRecoilValue(cartItemPriceStates(itemId));
            return {
              itemQuantity,
              itemPrice,
            };
          },
          { wrapper: ({ children }) => <RecoilRoot initializeState={initialState}>{children}</RecoilRoot> }
        );

        expect(result.current.itemQuantity).toBe(itemQuantity);
        expect(result.current.itemPrice).toBe(itemPrice);
      }
    );
  });

  describe("checkedCartItemsQuantityState 테스트", () => {
    it("checkedCartItemsState atom의 초기 값은 빈 배열", () => {
      const { result } = renderHook(() => useRecoilValue(checkedCartItemsState), {
        wrapper: RecoilRoot,
      });
      expect(result.current).toEqual([]);
    });

    it("장바구니에서 선택된 아이템의 총 갯수 테스트", () => {
      const { result } = renderHook(
        () => {
          const totalQuantity = useRecoilValue(checkedCartItemsQuantityState);
          const setCheckedCartItems = useSetRecoilState(checkedCartItemsState);
          return {
            totalQuantity,
            setCheckedCartItems,
          };
        },
        { wrapper: ({ children }) => <RecoilRoot initializeState={initialState}>{children}</RecoilRoot> }
      );

      act(() => {
        result.current.setCheckedCartItems([786, 787]);
      });

      expect(result.current.totalQuantity).toBe(24);
    });
  });

  describe("totalCheckedCartItemsPriceState 테스트", () => {
    it("장바구니에서 선택된 아이템에 따른 총 금액 테스트", () => {
      const { result } = renderHook(
        () => {
          const totalPrice = useRecoilValue(totalCheckedCartItemsPriceState);
          const setCheckedCartItems = useSetRecoilState(checkedCartItemsState);
          return {
            totalPrice,
            setCheckedCartItems,
          };
        },
        { wrapper: ({ children }) => <RecoilRoot initializeState={initialState}>{children}</RecoilRoot> }
      );

      act(() => {
        result.current.setCheckedCartItems([786, 787]);
      });

      expect(result.current.totalPrice).toBe(174000);
    });
  });
});
