import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PriceContainer from "./PriceContainer";
import {
  DELIVERY_PRICE,
  FREE_DELIVERY_LIMIT,
  FREE_DELIVERY_PRICE,
} from "@/domains/constants/delivery";

describe("CartPage의 PriceContainer", () => {
  it(`주문 목록에 담긴 상품의 개수 * 가격만큼 주문 금액이 나온다. 주문 금액이 ${FREE_DELIVERY_LIMIT}만원 미만인 경우 배송비가 ${DELIVERY_PRICE}원이다.`, async () => {
    const price = 10_000;
    const priceList = [
      {
        title: "주문 금액",
        price,
      },
      {
        title: "배송비",
        price: DELIVERY_PRICE,
      },
      {
        title: "총 결제 금액",
        price: price + DELIVERY_PRICE,
      },
    ];
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <PriceContainer
            priceList={priceList}
            paymentPrice={price + DELIVERY_PRICE}
          />
        </MemoryRouter>
      );
    });

    expect(screen.getByTestId("주문 금액-price").textContent).toBe(
      `${price.toLocaleString()}원`
    );
    expect(screen.getByTestId("배송비-price").textContent).toBe(
      `${DELIVERY_PRICE.toLocaleString()}원`
    );
    expect(screen.getByTestId("payment-price").textContent).toBe(
      `${(price + DELIVERY_PRICE).toLocaleString()}원`
    );
  });

  it(`주문 목록에 담긴 상품의 개수 * 가격만큼 주문 금액이 나온다. 주문 금액이 ${FREE_DELIVERY_LIMIT}만원 이상인 경우 배송비가 0원이다.`, async () => {
    const price = 100_000;
    const priceList = [
      {
        title: "주문 금액",
        price,
      },
      {
        title: "배송비",
        price: 0,
      },
      {
        title: "총 결제 금액",
        price: price + DELIVERY_PRICE,
      },
    ];
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <PriceContainer priceList={priceList} paymentPrice={price + 0} />
        </MemoryRouter>
      );
    });

    expect(screen.getByTestId("주문 금액-price").textContent).toBe(
      `${price.toLocaleString()}원`
    );
    expect(screen.getByTestId("배송비-price").textContent).toBe(
      `${FREE_DELIVERY_PRICE.toLocaleString()}원`
    );
    expect(screen.getByTestId("payment-price").textContent).toBe(
      `${(price + FREE_DELIVERY_PRICE).toLocaleString()}원`
    );
  });
});
