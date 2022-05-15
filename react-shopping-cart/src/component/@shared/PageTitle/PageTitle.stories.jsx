import PageTitle from "component/@shared/PageTitle/PageTitle";
import { ReactComponent as Cart } from "assets/cart.svg";

export default {
  title: "PageTitle",
  component: PageTitle,
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
  <PageTitle {...args}></PageTitle>
);
DefaultShoppingCartTitle.args = {
  children: [<Cart />, <div>WOOWA SHOP</div>],
};
