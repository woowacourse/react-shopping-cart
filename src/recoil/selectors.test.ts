import { renderHook, act } from "@testing-library/react";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { checkedCartItemsQuantityState, totalCheckedCartItemsPriceState } from "./selectors";
import { cartItemPriceStates, cartItemQuantityStates, checkedCartItemsState } from "./atoms";

describe("Selector 테스트", () => {
  // 아이템의 가격, 개수를 미리 설정
  //   beforeEach(() => {
  //     const { result } = renderHook(
  //       () => {
  //         const setCartItemQuantity3 = useSetRecoilState(cartItemQuantityStates(3));
  //         const setCartItemPrice3 = useSetRecoilState(cartItemPriceStates(3));
  //         const setCartItemQuantity11 = useSetRecoilState(cartItemQuantityStates(11));
  //         const setCartItemPrice11 = useSetRecoilState(cartItemPriceStates(11));

  //         return { setCartItemQuantity3, setCartItemPrice3, setCartItemPrice11, setCartItemQuantity11 };
  //       },
  //       {
  //         wrapper: RecoilRoot,
  //       }
  //     );

  //     act(() => {
  //       result.current.setCartItemQuantity3(17);
  //       result.current.setCartItemPrice3(2000);
  //       result.current.setCartItemQuantity11(7);
  //       result.current.setCartItemPrice11(20000);
  //     });
  //   });

  describe("setCartPriceAndQuantitySelector 테스트", () => {
    it.each([
      [3, 17, 2000],
      [11, 7, 20000],
    ])(
      "id: %d 에 대한 가격, 개수가 atom에 저장되는지 테스트",
      (itemId: number, itemQuantity: number, itemPrice: number) => {
        const { result } = renderHook(
          () => {
            const setCartItemQuantity3 = useSetRecoilState(cartItemQuantityStates(3));
            const setCartItemPrice3 = useSetRecoilState(cartItemPriceStates(3));
            const setCartItemQuantity11 = useSetRecoilState(cartItemQuantityStates(11));
            const setCartItemPrice11 = useSetRecoilState(cartItemPriceStates(11));
            const itemQuantity = useRecoilValue(cartItemQuantityStates(itemId));
            const itemPrice = useRecoilValue(cartItemPriceStates(itemId));
            return {
              setCartItemQuantity3,
              setCartItemPrice3,
              setCartItemPrice11,
              setCartItemQuantity11,
              itemQuantity,
              itemPrice,
            };
          },
          {
            wrapper: RecoilRoot,
          }
        );

        act(() => {
          result.current.setCartItemQuantity3(17);
          result.current.setCartItemPrice3(2000);
          result.current.setCartItemQuantity11(7);
          result.current.setCartItemPrice11(20000);
        });

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
          const setCartItemQuantity3 = useSetRecoilState(cartItemQuantityStates(3));
          const setCartItemPrice3 = useSetRecoilState(cartItemPriceStates(3));
          const setCartItemQuantity11 = useSetRecoilState(cartItemQuantityStates(11));
          const setCartItemPrice11 = useSetRecoilState(cartItemPriceStates(11));
          const totalQuantity = useRecoilValue(checkedCartItemsQuantityState);
          const setCheckedCartItems = useSetRecoilState(checkedCartItemsState);
          return {
            setCartItemQuantity3,
            setCartItemPrice3,
            setCartItemPrice11,
            setCartItemQuantity11,
            totalQuantity,
            setCheckedCartItems,
          };
        },
        {
          wrapper: RecoilRoot,
        }
      );

      act(() => {
        result.current.setCartItemQuantity3(17);
        result.current.setCartItemPrice3(2000);
        result.current.setCartItemQuantity11(7);
        result.current.setCartItemPrice11(20000);
      });

      act(() => {
        result.current.setCheckedCartItems([3, 11]);
      });

      expect(result.current.totalQuantity).toBe(24);
    });
  });

  describe("totalCheckedCartItemsPriceState 테스트", () => {
    it("장바구니에서 선택된 아이템에 따른 총 금액 테스트", () => {
      const { result } = renderHook(
        () => {
          const setCartItemQuantity3 = useSetRecoilState(cartItemQuantityStates(3));
          const setCartItemPrice3 = useSetRecoilState(cartItemPriceStates(3));
          const setCartItemQuantity11 = useSetRecoilState(cartItemQuantityStates(11));
          const setCartItemPrice11 = useSetRecoilState(cartItemPriceStates(11));
          const totalPrice = useRecoilValue(totalCheckedCartItemsPriceState);
          const setCheckedCartItems = useSetRecoilState(checkedCartItemsState);
          return {
            setCartItemQuantity3,
            setCartItemPrice3,
            setCartItemPrice11,
            setCartItemQuantity11,
            totalPrice,
            setCheckedCartItems,
          };
        },
        {
          wrapper: RecoilRoot,
        }
      );

      act(() => {
        result.current.setCartItemQuantity3(17);
        result.current.setCartItemPrice3(2000);
        result.current.setCartItemQuantity11(7);
        result.current.setCartItemPrice11(20000);
      });

      act(() => {
        result.current.setCheckedCartItems([3, 11]);
      });

      expect(result.current.totalPrice).toBe(174000);
    });
  });
});
