import React from "react";
import { Story, Meta } from "@storybook/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

import ProductDetail from ".";
import { Product } from "../../types";
import store from "../../store";

const product: Product = {
  productId: "1",
  name: "강릉초당순두부인절미아이스크림",
  price: 2500,
  imageUrl: "http://via.placeholder.com/570x570",
};

export default {
  title: "Pages/ProductDetail",
  component: ProductDetail,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ state: { product } }]}>
          <Story />
        </MemoryRouter>
      </Provider>
    ),
  ],
} as Meta;

const Template: Story = () => <ProductDetail />;

export const Basic = Template.bind({});
