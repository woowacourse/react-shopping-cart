import Header from 'components/@shared/Header/Header';

import HomeButton from 'components/HomeButton/HomeButton';
import NavigationButtonList from 'components/NavigationButtonList/NavigationButtonList';

import { ReactComponent as Cart } from 'assets/cart.svg';

export default {
  title: 'Header',
  component: Header,
};

export const ShoppingCartPageHeader = (args) => <Header {...args} />;

ShoppingCartPageHeader.args = {
  left: <HomeButton title="WOOWA SHOP" emoji={<Cart />} />,
  right: <NavigationButtonList />,
};
