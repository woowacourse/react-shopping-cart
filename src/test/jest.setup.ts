import { cartJson, couponsJson } from "./mockData";

jest.mock("../api/cart", () => ({
  getCartItems: jest.fn().mockImplementation(() => Promise.resolve(cartJson)),
}));

jest.mock("../api/coupon", () => ({
  getCoupons: jest.fn().mockImplementation(() => Promise.resolve(couponsJson)),
}));

process.env.TZ = "Asia/Seoul";
