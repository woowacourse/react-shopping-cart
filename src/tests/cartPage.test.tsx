import { render, screen, waitFor, renderHook } from "@testing-library/react";
import {
  SetRecoilState,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { RecoilRoot } from "recoil";
import { act } from "react";
import { CartItemListMock } from "./mock";

import { selectedCartItems } from "../recoil/selectedCardItems";
import { cartItemQuantity } from "../recoil/cartItemQuantity";
import { cartItems } from "../recoil/cartItems";

import CartPage from "../pages/CartPage/CartPage";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";

import {
  totalOrderPriceSelector,
  shippingFeeSelector,
} from "@/recoil/orderInformation";

jest.mock("../apis/index", () => ({
  config: {
    apiUrl: "http://localhost:mock",
  },
}));

const initializeState = ({ set }: { set: SetRecoilState }) => {
  set(cartItems, CartItemListMock);

  CartItemListMock.forEach((item) => {
    set(selectedCartItems(item.id), true);
    set(cartItemQuantity(item.id), item.quantity);
  });
};

const renderWithRecoilRoot = (children: React.ReactNode) => {
  return render(
    <RecoilRoot initializeState={initializeState}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>{children}</MemoryRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
};

describe.skip("cartPage", () => {
  beforeEach(async () => {
    await act(async () => {
      renderWithRecoilRoot(<CartPage />);
    });
  });

  describe("초기 페이지가 잘 렌더링 되는지 확인한다.", () => {
    it("CartPage", async () => {
      await waitFor(() => {
        CartItemListMock.forEach((item) => {
          expect(screen.getByText(item.quantity)).toBeInTheDocument();
          expect(screen.getByText(item.product.name)).toBeInTheDocument();
        });
      });
    });
  });
});

describe("상품 수량을 변경하는 기능", () => {
  it("상품 수량 초기값 확인", () => {
    const { result } = renderHook(
      () => useRecoilValue(cartItemQuantity(CartItemListMock[0].id)),
      {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
        ),
      }
    );

    expect(result.current).toBe(CartItemListMock[0].quantity);
  });

  it("상품 수량을 올리면 기존 수량에서 +1이 된다.", async () => {
    const { result } = renderHook(
      () => useRecoilState(cartItemQuantity(CartItemListMock[0].id)),
      {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
        ),
      }
    );

    const [quantity, setQuantity] = result.current;
    expect(quantity).toBe(CartItemListMock[0].quantity);

    act(() => {
      setQuantity((prevQuantity) => prevQuantity + 1);
    });

    await waitFor(() => {
      const [updatedQuantity] = result.current;
      expect(updatedQuantity).toBe(CartItemListMock[0].quantity + 1);
    });
  });
});

describe("상품 가격을 계산하는 기능", () => {
  it("초기 총 가격은 1600원", () => {
    const { result } = renderHook(
      () => useRecoilValue(totalOrderPriceSelector),
      {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
        ),
      }
    );

    expect(result.current).toBe(1600);
  });

  it("상품 개수에 따른 총 가격 계산", () => {
    const { result } = renderHook(
      () => {
        const totalPrice = useRecoilValue(totalOrderPriceSelector);
        const setCartItemCount = useSetRecoilState(
          cartItemQuantity(CartItemListMock[0].id)
        );

        return { totalPrice, setCartItemCount };
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
        ),
      }
    );

    act(() => {
      result.current.setCartItemCount(2);
    });
    expect(result.current.totalPrice).toBe(2600);

    act(() => {
      result.current.setCartItemCount(5);
    });
    expect(result.current.totalPrice).toBe(5600);
  });

  it("10만원 이하이면 배송비를 3000원으로 계산하고 이상이면 무료로 계산", () => {
    const { result } = renderHook(
      () => {
        const shippingFee = useRecoilValue(shippingFeeSelector);
        const setCartItemCount = useSetRecoilState(
          cartItemQuantity(CartItemListMock[0].id)
        );
        return { shippingFee, setCartItemCount };
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
        ),
      }
    );

    expect(result.current.shippingFee).toBe(3000);

    act(() => {
      result.current.setCartItemCount(100);
    });
    expect(result.current.shippingFee).toBe(0);
  });
});

describe("상품 제거 기능", () => {
  it("상품을 삭제할 경우, 상품 갯수가 줄어든다", async () => {
    const { result } = renderHook(() => useRecoilState(cartItems), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    const [items, setItems] = result.current;

    // 초기 상태 확인
    expect(items.length).toBe(CartItemListMock.length);

    // 첫 번째 상품 제거
    act(() => {
      setItems((prevItems) =>
        prevItems.filter((item) => item.id !== CartItemListMock[0].id)
      );
    });

    // 상태 업데이트 후 확인
    await waitFor(() => {
      const [updatedItems] = result.current;
      expect(updatedItems.length).toBe(CartItemListMock.length - 1);
    });
  });
});

// 초기 모킹 데이터 페칭 테스트

/*
상품 선택 기능: 개별 상품의 선택/해제 시 선택 여부가 정상적으로 변경되는지 테스트한다.
수량 변경 기능: 상품의 수량을 변경할 때 올바르게 반영되는지 테스트한다.
상품 제거 기능: 장바구니에서 상품을 제거할 때 정상적으로 동작하는지 테스트한다.

결제 금액 계산: 선택된 상품들의 가격 합계가 결제 금액으로 정상 반영되는지 테스트한다.

배송비 계산: 결제 금액에 따라 배송비가 정상적으로 계산되는지 (10만원 이상 무료) 테스트한다.
*/
