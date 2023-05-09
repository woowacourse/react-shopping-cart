import React from "react";
import Product from "./Product";
import { StoryFn } from "@storybook/react";

export default {
  title: "Product",
  component: Product,
};

const Template: StoryFn<React.ComponentProps<typeof Product>> = (props) => (
  <Product {...props} />
);

export const Controls = Template.bind({});
Controls.args = {
  id: 0,
  name: "PET보틀-정사각(420ml)",
  price: 43400,
  imageUrl: "juice.png",
};
