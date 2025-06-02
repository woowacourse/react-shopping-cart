import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CartItem from "@/components/CartItem/CartItem";
import { GetCartItemsResponse } from "@/types";
import { QueryProvider } from "@/modules";

const cartItem: GetCartItemsResponse["content"][number] = {
  id: 1,
  quantity: 2,
  product: {
    id: 1,
    name: "Test Product",
    price: 1000,
    imageUrl: "/test-image.png",
    category: "Test Category",
    stock: 100,
  },
};

describe("CartItem", () => {
  it("PlusMinusButton의 + 버튼을 클릭하면 수량이 증가한다", async () => {
    const refetch = jest.fn();
    render(
      <QueryProvider>
        <CartItem cartItem={cartItem} isSelected={false} handleCheckboxClick={() => {}} refetch={refetch} />
      </QueryProvider>,
    );

    // 수량이 2로 표시되는지 확인
    expect(screen.getByText("2")).toBeInTheDocument();

    // + 버튼 클릭
    const plusButton = screen.getAllByRole("button").find((btn) => btn.textContent === "+");
    fireEvent.click(plusButton!);

    // 비동기 작업이 완료될 때까지 대기
    await waitFor(() => {
      expect(refetch).toHaveBeenCalledTimes(1);
    });
  });

  it("PlusMinusButton의 - 버튼을 클릭하면 수량이 감소한다", async () => {
    const refetch = jest.fn();
    render(
      <QueryProvider>
        <CartItem cartItem={cartItem} isSelected={false} handleCheckboxClick={() => {}} refetch={refetch} />
      </QueryProvider>,
    );

    // 수량이 2로 표시되는지 확인
    expect(screen.getByText("2")).toBeInTheDocument();

    // - 버튼 클릭
    const minusButton = screen.getAllByRole("button").find((btn) => btn.textContent === "-");
    fireEvent.click(minusButton!);

    // 비동기 작업이 완료될 때까지 대기
    await waitFor(() => {
      expect(refetch).toHaveBeenCalledTimes(1);
    });
  });

  it("체크박스를 클릭하면 handleCheckboxClick이 호출된다", () => {
    const refetch = jest.fn();
    const handleCheckboxClick = jest.fn();
    render(
      <QueryProvider>
        <CartItem cartItem={cartItem} isSelected={false} handleCheckboxClick={handleCheckboxClick} refetch={refetch} />
      </QueryProvider>,
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(handleCheckboxClick).toHaveBeenCalledTimes(1);
  });

  it("삭제 버튼을 클릭하면 refetch가 호출된다", async () => {
    const refetch = jest.fn();
    render(
      <QueryProvider>
        <CartItem cartItem={cartItem} isSelected={false} handleCheckboxClick={() => {}} refetch={refetch} />
      </QueryProvider>,
    );

    screen.debug(screen.getByText("삭제"));

    const deleteButton = screen.getByText("삭제");
    fireEvent.click(deleteButton);
    await waitFor(() => {
      expect(refetch).toHaveBeenCalled();
    });
  });

  it("상품 이미지가 깨지면 기본 이미지로 대체된다", () => {
    const refetch = jest.fn();
    render(
      <QueryProvider>
        <CartItem cartItem={cartItem} isSelected={false} handleCheckboxClick={() => {}} refetch={refetch} />
      </QueryProvider>,
    );

    const img = screen.getByAltText(cartItem.product.name) as HTMLImageElement;
    fireEvent.error(img);
    expect(img.src).toContain("default-img.png");
  });

  it("상품명, 가격, 수량이 올바르게 렌더링된다", () => {
    const refetch = jest.fn();
    render(
      <QueryProvider>
        <CartItem cartItem={cartItem} isSelected={false} handleCheckboxClick={() => {}} refetch={refetch} />
      </QueryProvider>,
    );

    expect(screen.getByText(cartItem.product.name)).toBeInTheDocument();
    expect(screen.getByText(`${cartItem.product.price.toLocaleString()}원`)).toBeInTheDocument();
    expect(screen.getByText(cartItem.quantity.toString())).toBeInTheDocument();
  });
});
