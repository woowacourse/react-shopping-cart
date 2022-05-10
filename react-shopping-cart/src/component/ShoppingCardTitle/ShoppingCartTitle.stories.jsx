import ShoppingCartTitle from "./ShoppingCartTitle";
import { ReactComponent as Cart } from "../../assets/cart.svg";

export default {
  title: "ShoppingCartTitle",
  component: ShoppingCartTitle,
  decorators: [
    (Story) => (
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
};

export const DefaultShoppingCartTitle = (args) => (
  <ShoppingCartTitle {...args}></ShoppingCartTitle>
);
DefaultShoppingCartTitle.args = {
  children: [<Cart />, <div>WOOWA SHOP</div>],
};
