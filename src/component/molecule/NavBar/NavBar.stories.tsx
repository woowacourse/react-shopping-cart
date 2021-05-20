import { Meta, Story } from '@storybook/react';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../constant';
import ShoppingCartIcon from '../../atom/ShoppingCartIcon/ShoppingCartIcon';
import NavBar, { NavBarProps } from './NavBar';

export default {
  title: 'ShoppingCart/NavBar',
  component: NavBar,
  argTypes: { children: { control: 'text' } },
} as Meta;

const Template: Story<NavBarProps> = ({ ...args }) => <NavBar {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  Logo: (
    <>
      <ShoppingCartIcon scale="0.8" color="white" />
      <span>WOOWA SHOP</span>
    </>
  ),
  Links: (
    <>
      <Link to={ROUTE.SHOPPING_CART}>장바구니</Link>
      <Link to={ROUTE.ORDER_LIST}>주문목록</Link>
    </>
  ),
};
