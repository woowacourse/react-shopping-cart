import { rest } from "msw";
import { mockCoupons } from "./coupons";
import { RestRequest, ResponseComposition, RestContext } from "msw";
import { Coupon } from "../types/coupons";
import { BASE_URL } from "../config";
import { PATH } from "../api/fetchWithAuth";

export const handlers = [
  rest.get(
    `${BASE_URL}${PATH.coupons}`,
    (_: RestRequest, res: ResponseComposition<Coupon[]>, ctx: RestContext) => {
      return res(ctx.status(200), ctx.json(mockCoupons));
    }
  ),
];
