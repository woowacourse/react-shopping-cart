import { rest } from "msw";
import mockData from "../mockData.json";

export const handlers = [
  rest.get("/api/products", (req, res, ctx) => {
    // const randomError = Math.random() > 0.5;

    // if (randomError) {
    //   return res(
    //     ctx.delay(2000),
    //     ctx.status(500),
    //     ctx.json({
    //       message: "상품이 없습니다.",
    //     })
    //   );
    // }

    return res(ctx.delay(2000), ctx.status(200), ctx.json(mockData));
  }),
];
