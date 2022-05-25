import PageTitle from "component/@shared/PageTitle/PageTitle";
import { ReactComponent as Cart } from "assets/cart.svg";
import { Meta, Story } from "@storybook/react";

export default {
  title: "PageTitle",
  component: PageTitle,
  decorators: [
    (Story: Story) => (
      <div
        style={{
          background: "black",
          width: "600px",
          height: "100px",
          textAlign: "center",
          lineHeight: "100px",
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

export const DefaultShoppingCartTitle: Story = () => (
  <PageTitle to="/"></PageTitle>
);
DefaultShoppingCartTitle.args = {
  children: [<Cart />, <div>WOOWA SHOP</div>],
};
