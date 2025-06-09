import { cartItemsHandler } from "./cartItems";
import { couponsHandler } from "./coupons";

export const handlers = [...cartItemsHandler, ...couponsHandler];
