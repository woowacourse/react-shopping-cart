import Header from "component/@shared/Header/Header";
import PageTitle from "component/@shared/PageTitle/PageTitle";
import { ReactComponent as Cart } from "assets/cart.svg";
import NavigateButton from "component/@shared/NavigateButton/NavigateButton";
import { RowFlexWrapper } from "styles/Wrapper";
import { Meta, Story } from "@storybook/react";
export default {
  title: "Header",
  component: Header,
} as Meta;

export const ShoppingCartPageHeader: Story = () => <Header />;

ShoppingCartPageHeader.args = {
  children: [
    <PageTitle to="/">
      <Cart />
      <div>WOOWA SHOP</div>
    </PageTitle>,
    <RowFlexWrapper gap="20px">
      <NavigateButton to="/">장바구니</NavigateButton>
      <NavigateButton to="/">주문목록</NavigateButton>
    </RowFlexWrapper>,
  ],
};
