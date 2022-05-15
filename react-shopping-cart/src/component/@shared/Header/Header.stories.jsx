import Header from "component/@shared/Header/Header";
import PageTitle from "component/@shared/PageTitle/PageTitle";
import { ReactComponent as Cart } from "assets/cart.svg";
import NavigateButton from "component/@shared/NavigateButton/NavigateButton";
import { RowFlexWrapper } from "styles/Wrapper";
export default {
  title: "Header",
  component: Header,
};

export const ShoppingCartPageHeader = (args) => <Header {...args} />;

ShoppingCartPageHeader.args = {
  children: [
    <PageTitle>
      <Cart />
      <div>WOOWA SHOP</div>
    </PageTitle>,
    <RowFlexWrapper gap="20px">
      <NavigateButton>장바구니</NavigateButton>
      <NavigateButton>주문목록</NavigateButton>
    </RowFlexWrapper>,
  ],
};
