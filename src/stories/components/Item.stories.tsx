import { StoryFn, Meta } from "@storybook/react";
import { Product } from "../../components";
import { MIN_QUANTITY } from "../../constants";

export default {
  title: "Product",
  component: Product,
} as Meta;

const Template: StoryFn = () => {
  const product = {
    id: 1,
    name: "PET보틀-정사각(420ml)",
    price: 10000,
    imageUrl: "Products/Product-001.svg",
    quantity: MIN_QUANTITY.toString(),
  };

  return <Product {...product} />;
};

export const ProductSample = Template.bind({});
