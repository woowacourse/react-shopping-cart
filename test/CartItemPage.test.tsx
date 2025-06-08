import "@testing-library/jest-dom";
import { vi } from "vitest";
import cartItemsApi from "../src/apis/cartItemsApi";
import { fireEvent, render, screen } from "@testing-library/react";
import CartItemPage from "../src/pages/CartItemPage";
import { CartItemProvider } from "../src/contexts/carItem/CartItemProvider";
import { MemoryRouter } from "react-router";
import { FREE_SHIPPING_MIN_AMOUNT, SHIPPING_FEE } from "../src/constants";
import { SelectedCartItemProvider } from "../src/contexts/selectedCartItem/SelectedCartItemProvider";

vi.mock("../src/apis/cartItemsApi");

const renderWithProviders = () =>
  render(
    <MemoryRouter>
      <CartItemProvider>
        <SelectedCartItemProvider>
          <CartItemPage />
        </SelectedCartItemProvider>
      </CartItemProvider>
    </MemoryRouter>
  );

describe("장바구니 페이지 테스트", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe("초기 렌더링 테스트", () => {
    const mockItems = [
      {
        id: 1,
        product: {
          id: 1,
          category: "식료품" as const,
          imageUrl: "https://example.com/image1.jpg",
          name: "콜라",
          price: 1500,
        },
        quantity: 2,
      },
      {
        id: 2,
        product: {
          id: 2,
          category: "식료품" as const,
          imageUrl: "https://example.com/image1.jpg",
          name: "사이다",
          price: 1500,
        },
        quantity: 2,
      },
    ];

    it("페이지에 장바구니 상품이 렌더링이 된다.", async () => {
      cartItemsApi.get = vi.fn().mockImplementation(async () => [...mockItems]);

      renderWithProviders();
      expect(await screen.findByText("콜라")).toBeInTheDocument();
    });

    it("초기 렌더링 시 모든 아이템이 선택되어 있어야 한다.", async () => {
      cartItemsApi.get = vi.fn().mockImplementation(async () => [...mockItems]);

      renderWithProviders();

      const allSelectedButton = await screen.findByTestId("all-select-toggle");
      expect(allSelectedButton).toHaveAttribute("aria-pressed", "true");
    });
  });

  describe("수량 조절 테스트", () => {
    let mockItems: {
      id: number;
      product: {
        id: number;
        category: string;
        imageUrl: string;
        name: string;
        price: number;
      };
      quantity: number;
      isSelected?: boolean;
    }[];

    beforeEach(() => {
      mockItems = [
        {
          id: 1,
          product: {
            id: 1,
            category: "식료품",
            imageUrl: "https://example.com/image1.jpg",
            name: "콜라",
            price: 1500,
          },
          quantity: 2,
          isSelected: true,
        },
      ];
    });

    it("페이지에 장바구니 상품이 렌더링되고 삭제할 수 있다", async () => {
      cartItemsApi.get = vi.fn().mockImplementation(async () => [...mockItems]);

      cartItemsApi.delete = vi.fn().mockImplementation(async (id: number) => {
        const idx = mockItems.findIndex((item) => item.id === id);
        if (idx !== -1) mockItems.splice(idx, 1);
        return;
      });

      renderWithProviders();

      expect(await screen.findByText("콜라")).toBeInTheDocument();

      const expectedTotal =
        mockItems[0].product.price * mockItems[0].quantity + SHIPPING_FEE;
      expect(
        await screen.findByText(expectedTotal.toLocaleString() + "원")
      ).toBeInTheDocument();

      const deleteButton = await screen.findByText("삭제");
      fireEvent.click(deleteButton);

      expect(
        await screen.findByText("장바구니에 담은 상품이 없습니다.")
      ).toBeInTheDocument();
    });

    it("수량 조절 버튼을 클릭해 수량을 조절할 수 있다", async () => {
      cartItemsApi.get = vi.fn().mockImplementation(async () => [...mockItems]);

      cartItemsApi.patch = vi
        .fn()
        .mockImplementation(async (id: number, newQty: number) => {
          const idx = mockItems.findIndex((item) => item.id === id);
          if (idx !== -1) mockItems[idx].quantity = newQty;
          return;
        });

      renderWithProviders();

      const increasedQty = mockItems[0].quantity + 1;
      const expectedTotalAfter =
        mockItems[0].product.price * increasedQty + SHIPPING_FEE;

      const increaseButton = await screen.findByTestId("increase-button");
      fireEvent.click(increaseButton);

      expect(await screen.findByText(String(increasedQty))).toBeInTheDocument();

      expect(
        await screen.findByText(expectedTotalAfter.toLocaleString() + "원")
      ).toBeInTheDocument();

      const allSelectedButton = await screen.findByTestId("all-select-toggle");
      expect(allSelectedButton).toHaveAttribute("aria-pressed", "true");
    });
  });

  describe("배송비 테스트", () => {
    it(`주문 금액이 ${FREE_SHIPPING_MIN_AMOUNT}원 이상이면 배송비는 0원이다.`, async () => {
      const mockExpensiveItem = [
        {
          id: 1,
          product: {
            id: 1,
            category: "패션잡화" as const,
            imageUrl: "https://example.com/image1.jpg",
            name: "맥북",
            price: 1500000,
          },
          quantity: 2,
          isSelected: true,
        },
      ];

      cartItemsApi.get = vi
        .fn()
        .mockImplementation(async () => [...mockExpensiveItem]);

      renderWithProviders();

      const shippingFee = await screen.findByTestId("shipping-fee");
      expect(shippingFee).toHaveTextContent("0원");
    });

    it(`주문 금액이 ${FREE_SHIPPING_MIN_AMOUNT}원 미만이면 배송비는 ${SHIPPING_FEE}원이다.`, async () => {
      const mockCheapItem = [
        {
          id: 1,
          product: {
            id: 1,
            category: "패션잡화" as const,
            imageUrl: "https://example.com/image1.jpg",
            name: "텀블러",
            price: 5000,
          },
          quantity: 2,
          isSelected: true,
        },
      ];

      cartItemsApi.get = vi
        .fn()
        .mockImplementation(async () => [...mockCheapItem]);

      renderWithProviders();

      const shippingFee = await screen.findByTestId("shipping-fee");
      expect(shippingFee).toHaveTextContent(
        `${SHIPPING_FEE.toLocaleString()}원`
      );
    });
  });

  describe("상품 선택 테스트", () => {
    let mockItems: {
      id: number;
      product: {
        id: number;
        category: string;
        imageUrl: string;
        name: string;
        price: number;
      };
      quantity: number;
    }[];

    beforeEach(() => {
      mockItems = [
        {
          id: 1,
          product: {
            id: 1,
            category: "식료품",
            imageUrl: "https://example.com/image1.jpg",
            name: "콜라",
            price: 1500,
          },
          quantity: 2,
        },
        {
          id: 2,
          product: {
            id: 2,
            category: "식료품",
            imageUrl: "https://example.com/image1.jpg",
            name: "사이다",
            price: 1500,
          },
          quantity: 2,
        },
      ];

      cartItemsApi.get = vi.fn().mockImplementation(async () => [...mockItems]);
    });

    it("전체 선택 버튼이 활성화되어 있을 때 클릭 시 모든 아이템이 선택되지 않은 상태로 바뀌어야 한다.", async () => {
      renderWithProviders();

      const allSelectedButton = await screen.findByTestId("all-select-toggle");
      expect(allSelectedButton).toHaveAttribute("aria-pressed", "true");

      fireEvent.click(allSelectedButton);
      expect(allSelectedButton).toHaveAttribute("aria-pressed", "false");
    });

    it("전체 선택 버튼이 비활성화되어 있을 때 클릭 시 모든 아이템이 선택된 상태로 바뀌어야 한다.", async () => {
      renderWithProviders();

      const allSelectedButton = await screen.findByTestId("all-select-toggle");
      fireEvent.click(allSelectedButton);
      expect(allSelectedButton).toHaveAttribute("aria-pressed", "false");

      fireEvent.click(allSelectedButton);
      expect(allSelectedButton).toHaveAttribute("aria-pressed", "true");
    });

    it("모든 아이템이 선택되어 있는 상황에서 개별 아이템을 선택 해제할 경우 전체 선택 버튼이 비활성화되어 있어야 한다.", async () => {
      renderWithProviders();

      const allSelectedButton = await screen.findByTestId("all-select-toggle");
      const itemToggles = await screen.findAllByTestId("item-toggle");

      fireEvent.click(itemToggles[0]);
      expect(allSelectedButton).toHaveAttribute("aria-pressed", "false");
    });

    it("일부 아이템이 선택되어 있지 않은 상황에서 모든 아이템을 선택할 경우 전체 선택 버튼이 활성화되어 있어야 한다.", async () => {
      renderWithProviders();

      const allSelectedButton = await screen.findByTestId("all-select-toggle");
      const itemToggles = await screen.findAllByTestId("item-toggle");

      fireEvent.click(itemToggles[0]);
      expect(allSelectedButton).toHaveAttribute("aria-pressed", "false");

      fireEvent.click(allSelectedButton);
      expect(allSelectedButton).toHaveAttribute("aria-pressed", "true");
    });
  });
});
