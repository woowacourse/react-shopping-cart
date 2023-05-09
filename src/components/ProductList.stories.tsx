import React from "react";
import ProductList from "./ProductList";
import { StoryFn } from "@storybook/react";

export default {
  title: "ProductList",
  component: ProductList,
};

const Template: StoryFn<React.ComponentProps<typeof ProductList>> = (props) => (
  <ProductList {...props} />
);

export const Controls = Template.bind({});
Controls.args = {
  products: [
    {
      id: 0,
      name: "PET보틀-정사각(420ml)",
      price: 43400,
      imageUrl: "juice.png",
    },
    {
      id: 1,
      name: "PET보틀-정사각(420ml)",
      price: 43400,
      imageUrl: "juice.png",
    },

    {
      id: 2,
      name: "PET보틀-정사각(420ml)",
      price: 43400,
      imageUrl: "juice.png",
    },

    {
      id: 3,
      name: "PET보틀-정사각(420ml)",
      price: 43400,
      imageUrl: "juice.png",
    },

    {
      id: 4,
      name: "PET보틀-정사각(420ml)",
      price: 43400,
      imageUrl: "juice.png",
    },

    {
      id: 5,
      name: "PET보틀-정사각(420ml)",
      price: 43400,
      imageUrl: "juice.png",
    },
    {
      id: 6,
      name: "PET보틀-정사각(420ml)",
      price: 43400,
      imageUrl: "juice.png",
    },

    {
      id: 7,
      name: "PET보틀-정사각(420ml)",
      price: 43400,
      imageUrl: "juice.png",
    },

    {
      id: 8,
      name: "PET보틀-정사각(420ml)",
      price: 43400,
      imageUrl: "juice.png",
    },

    {
      id: 9,
      name: "PET보틀-정사각(420ml)",
      price: 43400,
      imageUrl: "juice.png",
    },
  ],
};
