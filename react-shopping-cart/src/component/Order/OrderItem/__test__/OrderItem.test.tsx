import { render, screen } from "@testing-library/react";
import OrderItem from "../OrderItem";
import "@testing-library/jest-dom";
import MockTheme from "../../../../testMock/index";

describe("OrderItem 컴포넌트를 불러낼수 있다.", () => {
  test("OrderItem은 상품이름, 수량, 썸네일을 렌더해야한다.", () => {
    const orderItem = {
      thumbnail: "test-url",
      name: "테스트 상품",
      quantity: 3,
    };

    render(
      <MockTheme>
        <OrderItem {...orderItem} />
      </MockTheme>
    );

    expect(screen.getByText(orderItem.name)).toBeInTheDocument();
    expect(screen.getByText(`수량: ${orderItem.quantity}`)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", orderItem.thumbnail);
  });
});
