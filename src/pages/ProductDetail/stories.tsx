import React from "react";
import { Story, Meta } from "@storybook/react";
import { MemoryRouter } from "react-router";

import ProductDetail from ".";
import { Product } from "../../types";

const product: Product = {
  product_id: "1",
  name: "강릉초당순두부인절미아이스크림",
  price: 2500,
  image_url: "http://via.placeholder.com/570x570",
};

export default {
  title: "Pages/ProductDetail",
  component: ProductDetail,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={[{ state: { product } }]}>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

const Template: Story = () => <ProductDetail />;

export const Basic = Template.bind({});
