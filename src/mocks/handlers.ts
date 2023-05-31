import { rest } from "msw";
import productsJson from "./mockData/products.json";
import cartItemsJson from "./mockData/cartItems.json";
import { ProductsWithId, CartProducts } from "../types";

let products: ProductsWithId = productsJson;
let cartItems: CartProducts = cartItemsJson;

const handlers = [
  rest.get("/products", (_, res, ctx) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res(ctx.status(200), ctx.json(products)));
      }, 500);
    });
  }),

  rest.get("/cart-items", (_, res, ctx) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res(ctx.status(200), ctx.json(cartItems)));
      }, 500);
    });
  }),

  rest.post("/cart-items", (req, res, ctx) => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const json = await req.json();

        const searchedProduct = products.find(
          (product) => product.id === json.productId
        );

        const isExist = !!cartItems.find(
          (product) => product.id === json.productId
        );

        if (searchedProduct && !isExist) {
          cartItems.push({
            id: json.productId,
            quantity: 1,
            product: searchedProduct,
          });
        }

        resolve(res(ctx.status(201), ctx.json({ success: true })));
      }, 0);
    });
  }),

  rest.patch("/cart-items/:cartItemId", (req, res, ctx) => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const json = await req.json();
        const { cartItemId } = req.params;

        cartItems = cartItems.map((cartItem) => {
          if (cartItem.id === Number(cartItemId)) {
            return { ...cartItem, quantity: json.quantity };
          }

          return cartItem;
        });
        resolve(res(ctx.status(200), ctx.json({ success: true })));
      }, 0);
    });
  }),

  rest.delete("/cart-items/:cartItemId", (req, res, ctx) => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const { cartItemId } = req.params;

        cartItems = cartItems.filter(({ id }) => id !== Number(cartItemId));
        resolve(res(ctx.status(200), ctx.json({ success: true })));
      }, 0);
    });
  }),
];

export { handlers };
