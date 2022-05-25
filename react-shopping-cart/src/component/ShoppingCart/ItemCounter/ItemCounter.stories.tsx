import { Story, Meta } from "@storybook/react";
import ItemCounter from "component/ShoppingCart/ItemCounter/ItemCounter";

export default {
  title: "ItemCounter",
  component: ItemCounter,
} as Meta;

export const DefaultItemCounter: Story<{ id: string }> = (args) => (
  <ItemCounter {...args} />
);
DefaultItemCounter.args = {
  id: "sming1",
};
