import "whatwg-fetch";
import "@testing-library/jest-dom";

import { fetchCoupons } from "./coupons";
import { mockRawCoupons } from "../mocks/coupons";
import { setupServer } from "msw/node";
import { handlers } from "../mocks/fetch";
import { ResponseComposition, RestContext, RestRequest, rest } from "msw";
import { BASE_URL } from "../config";
import { PATH } from "./fetchWithAuth";
import { RawCoupon } from "../types/coupons";

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe("api/coupons", () => {
  describe("get coupons", () => {
    it("API 호출에 성공하면 쿠폰 목록을 반환한다.", async () => {
      const response = await fetchCoupons();
      expect(response).toEqual(mockRawCoupons);
    });

    it("API 호출에 실패하면 적절한 에러 메시지를 반환한다.", async () => {
      server.use(
        rest.get(
          `${BASE_URL}${PATH.coupons}`,
          (
            _: RestRequest,
            res: ResponseComposition<RawCoupon[]>,
            ctx: RestContext
          ) => {
            return res(ctx.status(500));
          }
        )
      );
      await expect(async () => await fetchCoupons()).rejects.toThrow();
    });
  });
});
