import { rest } from "msw";
import { RestRequest, ResponseComposition, RestContext } from "msw";
import { RawCoupon } from "../types/coupons";
import { BASE_URL } from "../config";
import { PATH } from "../api/fetchWithAuth";
import { mockRawCoupons } from "./coupons";

export const handlers = [
  rest.get(
    `${BASE_URL}${PATH.coupons}`,
    (
      _: RestRequest,
      res: ResponseComposition<RawCoupon[]>,
      ctx: RestContext
    ) => {
      return res(ctx.status(200), ctx.json(mockRawCoupons));
    }
  ),
];
