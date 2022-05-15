import Header from 'components/@shared/Header/Header';
import NavigateButton from 'components/@shared/NavigateButton/NavigateButton';
import PageTitle from 'components/@shared/PageTitle/PageTitle';

import { RowFlexWrapper } from 'styles/Wrapper';

import { ReactComponent as Cart } from 'assets/cart.svg';

export default {
  title: 'Header',
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
