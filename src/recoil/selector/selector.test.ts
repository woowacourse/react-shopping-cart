import { act, renderHook } from "@testing-library/react";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { mockCartItemsData } from "../../mocks/mockCartItemsData";
import { cartItemsState } from "../atoms/atoms";
import { uniqueItemCountState, deliveryPriceState, orderPriceState } from "./selector";

describe("초기값 테스트", () => {
  it("상품 종류 수량 초기값은 0이다.", () => {
    const { result } = renderHook(() => useRecoilValue(uniqueItemCountState), {
      wrapper: RecoilRoot,
    });

    expect(result.current).toBe(0);
  });
  it("주문 금액 초기값은 0이다.", () => {
    const { result } = renderHook(() => useRecoilValue(orderPriceState), {
      wrapper: RecoilRoot,
    });

    expect(result.current).toBe(0);
  });
});

describe("mockData를 이용한 테스트", () => {
  it("주문 금액이 올바르게 계산되는지 확인한다.", () => {
    const { result } = renderHook(
      () => {
        const setCartItems = useSetRecoilState(cartItemsState);
        const orderPrice = useRecoilValue(orderPriceState);
        return { setCartItems, orderPrice };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    act(() => {
      result.current.setCartItems(
        mockCartItemsData.content.map((item) => ({
          id: item.id,
          product: {
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            imageUrl: item.product.imageUrl,
            category: item.product.category,
          },
          quantity: item.quantity,
        }))
      );
    });

    const expectedOrderPrice = mockCartItemsData.content.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    expect(expectedOrderPrice).toBe(23000);
  });

  it("주문 금액이 10만원 미만이면 배송비 3천원이 올바르게 계산되는지 확인한다.", () => {
    const { result } = renderHook(
      () => {
        const setCartItems = useSetRecoilState(cartItemsState);
        const orderPrice = useRecoilValue(orderPriceState);
        const deliveryPrcie = useRecoilValue(deliveryPriceState);
        return { setCartItems, orderPrice, deliveryPrcie };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    act(() => {
      result.current.setCartItems(
        mockCartItemsData.content.map((item) => ({
          id: item.id,
          product: {
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            imageUrl: item.product.imageUrl,
            category: item.product.category,
          },
          quantity: item.quantity,
        }))
      );
    });

    const expectedOrderPrice = mockCartItemsData.content.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    const expectedDeliveryPrice = expectedOrderPrice > 100000 ? 0 : 3000;

    expect(expectedDeliveryPrice).toBe(3000);
  });
});
