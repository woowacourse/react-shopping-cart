import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ShoppingCartPage from "../ShoppingCartPage";
import MockTheme from "testMock/index";

const { useSelector } = require("react-redux");

const mockNavigate = jest.fn();
const mockDispatch = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));
useSelector.mockReturnValue([
  {
    thumbnail: "test-url",
    name: "테스트 상품",
    quantity: 3,
    user: "sming",
    id: "sming2",
    price: 23421,
    checked: true,
  },
  {
    thumbnail: "test-url",
    name: "테스트 상품",
    quantity: 3,
    user: "sming",
    id: "sming2",
    price: 23421,
    checked: false,
  },
]);

describe("orderItem을 추가하는 action 테스트", () => {
  test("OrderButton을 클릭할시 주문목록 페이지로 이동한다.", () => {
    render(
      <MockTheme>
        <ShoppingCartPage />
      </MockTheme>
    );

    const orderButton = screen.getByTestId("order-button");
    fireEvent.click(orderButton);

    expect(mockNavigate).toBeCalledWith("/order");
  });

  test("OrderButton을 클릭할시 OrderItem 추가 요청을 보내야한다.", () => {
    render(
      <MockTheme>
        <ShoppingCartPage />
      </MockTheme>
    );

    const orderButton = screen.getByTestId("order-button");
    fireEvent.click(orderButton);

    expect(mockDispatch).toBeCalledWith({
      type: "addOrderStart",
      payload: [
        {
          thumbnail: "test-url",
          name: "테스트 상품",
          quantity: 3,
          user: "sming",
          id: "sming2",
          price: 23421,
          checked: true,
        },
      ],
    });
  });
});
