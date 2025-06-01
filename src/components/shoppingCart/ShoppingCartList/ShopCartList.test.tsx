import "@testing-library/jest-dom";
import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, it, expect, vi } from "vitest";

import { CartItemListProvider } from "../../../contexts/CartItemListContext";
import { ErrorProvider } from "../../../contexts/ErrorContext";

import TestProvider from "../../../utils/TestProvider";

import ShoppingCartList from "./ShoppingCartList";

import CartItem from "../../../types/CartItem";

interface CartItemCheck {
  id: number;
  quantity: number;
  price: number;
  isClicked: boolean;
}

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <MemoryRouter>
      <ErrorProvider>
        <CartItemListProvider>{children}</CartItemListProvider>
      </ErrorProvider>
    </MemoryRouter>
  );
}

const cartItemList: CartItem[] = [
  {
    id: 9704,
    quantity: 3,
    product: {
      id: 188,
      name: "페이지0부터시작",
      price: 1000000,
      imageUrl:
        "https://i.namu.wiki/i/uwHGKFJAZTgXlnja_ul4Z-myJ1KUyA32HL9mOw69w9c3-KRKwb6S0Sk5EtuE_cRWoES5QIUORWgXHH6oJleBMA.webp",
      category: "패션잡화",
      quantity: 10,
    },
  },
  {
    id: 9705,
    quantity: 1,
    product: {
      id: 190,
      name: "침착맨",
      price: 10,
      imageUrl:
        "https://resources.chimhaha.net/article/1731064511423-9dwgapocg1d.png",
      category: "패션잡화",
      quantity: 2,
    },
  },
  {
    id: 9706,
    quantity: 1,
    product: {
      id: 68,
      name: "11",
      price: 11,
      imageUrl: "11",
      category: "식료품",
      quantity: 4,
    },
  },
  {
    id: 9707,
    quantity: 3,
    product: {
      id: 69,
      name: "12",
      price: 12,
      imageUrl: "12",
      category: "패션잡화",
      quantity: 5,
    },
  },
  {
    id: 9924,
    quantity: 2,
    product: {
      id: 185,
      name: "황채원",
      price: 1,
      imageUrl:
        "https://image.istarbucks.co.kr/upload/store/skuimg/2025/04/[9200000003276]_20250410084448397.jpg",
      category: "식료품",
      quantity: 0,
    },
  },
];

const cartItemCheckList: CartItemCheck[] = [
  {
    id: 9704,
    quantity: 3,
    price: 1,
    isClicked: true,
  },
  {
    id: 9705,
    quantity: 1,
    price: 10,
    isClicked: true,
  },
  {
    id: 9706,
    quantity: 1,
    price: 11,
    isClicked: true,
  },
  {
    id: 9707,
    quantity: 3,
    price: 12,
    isClicked: true,
  },
  {
    id: 9924,
    quantity: 2,
    price: 1,
    isClicked: true,
  },
];

const toggleAll = vi.fn();
const handleSelectedCartItem = vi.fn();
const allChecked = true;

describe("ShoppingCartList 컴포넌트는", () => {
  it("페이지를 실행시켰을 때, ShoppingCartList가 보여진다.", () => {
    render(
      <Provider>
        <ShoppingCartList
          cartItemList={cartItemList}
          cartItemCheckList={cartItemCheckList}
          allChecked={allChecked}
          toggleAll={toggleAll}
          handleSelectedCartItem={handleSelectedCartItem}
        />
      </Provider>
    );
    expect(screen.getByText("페이지0부터시작")).toBeInTheDocument();
  });

  it("페이지를 실행시켰을 때, 모든 항목의 체크박스가 활성화된다.", () => {
    render(
      <Provider>
        <ShoppingCartList
          cartItemList={cartItemList}
          cartItemCheckList={cartItemCheckList}
          allChecked={allChecked}
          toggleAll={toggleAll}
          handleSelectedCartItem={handleSelectedCartItem}
        />
      </Provider>
    );
    const allCheckboxes = screen.getAllByRole("checkbox");
    expect(allCheckboxes).toHaveLength(cartItemList.length + 1);
    allCheckboxes.forEach((cb) => expect(cb).toBeChecked());
  });

  it("전체 선택 체크박스를 클릭하면 toggleAll이 호출된다", () => {
    render(
      <Provider>
        <ShoppingCartList
          cartItemList={cartItemList}
          cartItemCheckList={cartItemCheckList}
          allChecked={false}
          toggleAll={toggleAll}
          handleSelectedCartItem={handleSelectedCartItem}
        />
      </Provider>
    );

    const checkbox = screen.getByRole("checkbox", { name: "전체 선택" });
    fireEvent.click(checkbox);

    expect(toggleAll).toHaveBeenCalled();
  });

  it("체크박스 클릭 시, 해당하는 상품의 체크 박스가 해제된다.", () => {
    render(
      <TestProvider>
        <ShoppingCartList
          cartItemList={cartItemList}
          cartItemCheckList={cartItemCheckList}
          allChecked={false}
          toggleAll={toggleAll}
          handleSelectedCartItem={handleSelectedCartItem}
        />
      </TestProvider>
    );

    const checkboxes = screen.getAllByRole("checkbox");
    const itemCheckbox = checkboxes[1];
    fireEvent.click(itemCheckbox);

    expect(handleSelectedCartItem).toHaveBeenCalledWith(9704);
  });
});
