import { StoryFn, Meta } from "@storybook/react";
import { Item } from "../../components";

export default {
  title: "Item",
  component: Item,
} as Meta;

const Template: StoryFn = () => {
  const item = {
    id: 1,
    name: "PET보틀-정사각(420ml)",
    price: 10000,
    imageUrl: "items/item-001.svg",
    quantity: "0",
  };

  return <Item {...item} />;
};

export const ItemSample = Template.bind({});
