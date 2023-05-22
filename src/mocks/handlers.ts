import { rest } from "msw";
import { KEY_LOCALSTORAGE_CART } from "../constants";
import mockData from "../mockData.json";
import { CartItemListType, ProductType } from "../types/domain";
import { getLocalStorage, setLocalStorage } from "../utils";

export const handlers = [
  // 상품 목록 조회
  rest.get("/products", (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(mockData));
  }),

  // 장바구니 아이템 목록 조회
  rest.get("/cart-items", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(getLocalStorage<CartItemListType>(KEY_LOCALSTORAGE_CART, []))
    );
  }),

  // 장바구니 아이템 추가
  rest.post("/cart-items", async (req, res, ctx) => {
    const { productId } = await req.json();

    const products = structuredClone(mockData);
    const cartItems = getLocalStorage<CartItemListType>(
      KEY_LOCALSTORAGE_CART,
      []
    );

    setLocalStorage(KEY_LOCALSTORAGE_CART, [
      ...cartItems,
      {
        ...products.find((product: ProductType) => product.id === productId),
        quantity: 1,
      },
    ]);

    return res(
      ctx.status(201),
      ctx.set("Location", "/cart-items/{cartItemId}")
    );
  }),

  // 장바구니 아이템 수량 변경
  rest.patch("/cart-items/:cartItemId", async (req, res, ctx) => {
    const { cartItemId } = req.params;
    const { quantity } = await req.json();

    const cartItems = getLocalStorage<CartItemListType>(
      KEY_LOCALSTORAGE_CART,
      []
    );
    const newCartItems = cartItems.map((cartItem) =>
      cartItem.id === Number(cartItemId)
        ? { ...cartItem, quantity: quantity }
        : cartItem
    );

    setLocalStorage(KEY_LOCALSTORAGE_CART, newCartItems);
    return res(ctx.status(200));
  }),

  // 장바구니 아이템 삭제
  rest.delete("/cart-items/:cartItemId", (req, res, ctx) => {
    const { cartItemId } = req.params;

    const cartItems = getLocalStorage<CartItemListType>(
      KEY_LOCALSTORAGE_CART,
      []
    );

    setLocalStorage(
      KEY_LOCALSTORAGE_CART,
      cartItems.filter((cartItem) => cartItem.id !== Number(cartItemId))
    );
    return res(ctx.status(204));
  }),
];
