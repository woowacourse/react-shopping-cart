import type { Preview } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import GlobalStyle from "../src/style/GlobalStyle";
import { RecoilRoot } from "recoil";
import { initializeWorker, mswDecorator } from "msw-storybook-addon";
import { rest } from "msw";
import products from "../src/mocks/mockData.json";

initializeWorker();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    msw: {
      handlers: [
        rest.get("/products", (req, res, ctx) => res(ctx.status(200), ctx.json(products))),
        rest.get("/cart-items", (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.json([
              {
                id: 1,
                quantity: 2,
                product: {
                  id: 1,
                  name: "친환경미니탕용기 158 중 (EL)",
                  price: 65500,
                  imageUrl:
                    "https://cdn-mart.baemin.com/goods/46/D139-RM-60367_%EC%86%8C%EB%9F%89_%EB%AF%B8%EB%8B%88%ED%83%95%EC%9A%A9%EA%B8%B0_EL_158_%EC%A4%91_%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg?h=700&w=700",
                },
              },
              {
                id: 2,
                quantity: 3,
                product: {
                  id: 2,
                  name: "친환경국용기 중 (EL/백색)",
                  price: 72400,
                  imageUrl:
                    "https://cdn-mart.baemin.com/goods/61/D139-RM-22941_%E1%84%80%E1%85%AE%E1%86%A8%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%80%E1%85%B5(EL_%E1%84%8C%E1%85%AE%E1%86%BC_%E1%84%87%E1%85%A2%E1%86%A8%E1%84%89%E1%85%A2%E1%86%A8)_%E1%84%86%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AB_%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpg?h=700&w=700",
                },
              },
            ])
          )
        ),
      ],
    },
  },
};

export const decorators = [
  mswDecorator,
  (Story) => (
    <>
      <GlobalStyle />
      <RecoilRoot>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </RecoilRoot>
    </>
  ),
];

export default preview;
