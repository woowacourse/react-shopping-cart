import { rest } from "msw";
import { API_URL } from "constants/index";
import { CartItem, Product } from "type";
import { PRODUCT_MOCK_DATA } from "./mockData";

type PathParams = Record<string, string | ReadonlyArray<string>>;

interface PathParamsId extends PathParams {
  id: string;
}
const data = localStorage.getItem("mock-carts");

let carts: Omit<CartItem, "quantity">[] = (data && JSON.parse(data)) ?? [];

export const handlers = [
  rest.get<never, never, Product[]>(
    `${API_URL}/products`,
    async (req, res, ctx) => {
      const pageQuery = req.url.searchParams.get("_page");
      const limitQuery = req.url.searchParams.get("_limit");
      if (pageQuery && limitQuery) {
        const initialPageId: number =
          Number(limitQuery) * (Number(pageQuery) - 1);
        const endPageId: number = initialPageId + Number(limitQuery);
        return res(
          ctx.status(200),
          ctx.json(PRODUCT_MOCK_DATA.slice(initialPageId, endPageId))
        );
      }
      return res(ctx.status(401));
    }
  ),

  rest.get<never, PathParamsId, Product>(
    `${API_URL}/products/:id`,
    async (req, res, ctx) => {
      const { id } = req.params;

      return res(ctx.status(200), ctx.json(PRODUCT_MOCK_DATA[Number(id)]));
    }
  ),

  rest.get<never, never, Omit<CartItem, "quantity">[]>(
    `${API_URL}/carts`,
    async (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(carts));
    }
  ),

  rest.post<CartItem, never, CartItem>(
    `${API_URL}/carts`,
    async (req, res, ctx) => {
      const product = req.body;
      console.log(carts);
      carts = [...carts, product];
      localStorage.setItem("mock-carts", JSON.stringify(carts));
      return res(ctx.status(200), ctx.json(product));
    }
  ),

  rest.delete<never, PathParamsId, Omit<CartItem, "quantity">>(
    `${API_URL}/carts/:id`,
    async (req, res, ctx) => {
      const { id } = req.params;

      const deletedCartItem: Omit<CartItem, "quantity"> | undefined =
        carts.find((cart) => cart.id === id);
      carts = carts.filter((cart) => cart.id !== id);

      localStorage.setItem("mock-carts", JSON.stringify(carts));
      if (typeof deletedCartItem !== "undefined") {
        return res(ctx.status(200), ctx.json(deletedCartItem));
      }
      return res(ctx.status(401));
    }
  ),
];
