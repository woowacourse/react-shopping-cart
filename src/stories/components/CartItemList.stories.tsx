import { StoryFn, Meta } from "@storybook/react";
import CartItemList from "components/CartItemList";

export default {
  title: "CartItemList",
  component: CartItemList,
} as Meta;

const Template: StoryFn = () => <CartItemList />;

export const Empty = Template.bind({});
