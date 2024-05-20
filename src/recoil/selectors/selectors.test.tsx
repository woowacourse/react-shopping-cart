import { renderHook } from "@testing-library/react";
import { useRecoilValue, snapshot_UNSTABLE } from "recoil";
import { RecoilRoot } from "recoil";
import { cartItemsState } from "./selectors";
import { Suspense } from "react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { API_URL } from "../../constants/cart";
import "@testing-library/jest-dom";

const Wrapper = () => {
  return (
    <RecoilRoot>
      <Suspense></Suspense>
    </RecoilRoot>
  );
};

const cartsJson = {
  content: [
    {
      id: 1274,
      quantity: 5,
      product: {
        id: 2,
        name: "나이키",
        price: 1000,
        imageUrl:
          "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png",
        category: "fashion",
      },
    },
    {
      id: 1284,
      quantity: 1,
      product: {
        id: 12,
        name: "컨버스",
        price: 20000,
        imageUrl:
          "https://sitem.ssgcdn.com/65/73/69/item/1000163697365_i1_750.jpg",
        category: "fashion",
      },
    },
  ],
};

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get(`${API_URL}/cart-items`, () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json(cartsJson);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("장바구니", () => {
  it("장바구니 데이터 로딩.", async () => {
    const initialSnapshot = snapshot_UNSTABLE();
    const release = initialSnapshot.retain();
    renderHook(
      () => {
        const value = useRecoilValue(cartItemsState);
        console.log(value);
        return value;
      },
      {
        wrapper: Wrapper,
      }
    );

    try {
      const value = await initialSnapshot.getPromise(cartItemsState);
      console.log(value);
    } finally {
      release();
    }
  });
});
