import { rest } from "msw";
import { products } from "./data/productsMockData";
import { shoppingCart } from "./data/shoppingCartMockData";

export const handlers = [
  rest.get("/products", async (req, res, ctx) => {
    const page = req.url.searchParams.get("_page");

    switch (page) {
      case "1":
        return res(ctx.status(200), ctx.json(products.current.slice(0, 10)));
      case "2":
        return res(ctx.status(200), ctx.json(products.current.slice(10, 20)));
      case "3":
        return res(ctx.status(200), ctx.json(products.current.slice(20, 28)));
      default:
        return res(ctx.status(200), ctx.json([]));
    }
  }),

  rest.get("/products/:id", async (req, res, ctx) => {
    const { id } = req.params;
    const targetProduct = products.current.find(
      (product) => product.id === Number(id)
    );

    return res(ctx.status(200), ctx.json(targetProduct));
  }),

  rest.patch("/products/:id", async (req, res, ctx) => {
    const { id } = req.params;
    const replaceProducts = products.current.map((product) => {
      if (product.id === Number(id)) return req.body;

      return product;
    });
    products.current = replaceProducts;

    return res();
  }),

  rest.get("/shopping-cart", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(shoppingCart.current));
  }),

  rest.patch("/shopping-cart/:id", async (req, res, ctx) => {
    const { id } = req.params;
    const newProducts = shoppingCart.current.map((product) => {
      if (product.id === Number(id)) return req.body;

      return product;
    });
    shoppingCart.current = newProducts;

    return res();
  }),

  rest.post("/shopping-cart", async (req, res, ctx) => {
    const isInShoppingCart = shoppingCart.current.some(
      (product) => product.id === req.body.id
    );

    if (isInShoppingCart) return res(ctx.status(400));

    shoppingCart.current.push(req.body);
    return res();
  }),

  rest.delete("/shopping-cart/:id", async (req, res, ctx) => {
    const { id } = req.params;
    const replaceProducts = shoppingCart.current.filter(
      (product) => product.id !== Number(id)
    );

    shoppingCart.current = replaceProducts;

    return res();
  }),
];
