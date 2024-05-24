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

import { selectedCartItemsIdState } from "../recoil/selectedCardItems";
import { cartItemQuantity } from "../recoil/cartItemQuantity";
import { cartItems } from "../recoil/cartItems";

import CartPage from "../pages/CartPage/CartPage";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";

import { totalOrderPriceSelector } from "@/recoil/orderInformation";

jest.mock("../auth/utils/index", () => ({
  config: {
    apiUrl: "http://localhost:mock",
  },
}));

const initializeState = ({ set }: { set: SetRecoilState }) => {
  set(cartItems, CartItemListMock);

  CartItemListMock.forEach((item) => {
    set(selectedCartItemsIdState, (prev) => [...prev, item.id]);
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
});

describe("상품 제거 기능", () => {
  it("상품을 삭제할 경우, 상품 갯수가 줄어든다", async () => {
    const { result } = renderHook(() => useRecoilState(cartItems), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    const [items, setItems] = result.current;

    expect(items.length).toBe(CartItemListMock.length);

    act(() => {
      setItems((prevItems) =>
        prevItems.filter((item) => item.id !== CartItemListMock[0].id)
      );
    });

    await waitFor(() => {
      const [updatedItems] = result.current;
      expect(updatedItems.length).toBe(CartItemListMock.length - 1);
    });
  });
});
