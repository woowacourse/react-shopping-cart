import { Link } from 'react-router-dom';
import ShoppingCartIcon from '../ShoppingCartIcon/ShoppingCartIcon';
import NavBar from './NavBar';

export default {
  title: 'ShoppingCart/NavBar',
  component: NavBar,
  argTypes: { children: { control: 'text' } },
};

const Template = ({ ...args }) => <NavBar {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  Logo: (
    <>
      <ShoppingCartIcon scale="0.8" color="white" />
      <span>WOOWA SHOP</span>
    </>
  ),
  Buttons: (
    <>
      <Link to="/cart">장바구니</Link>
      <Link to="/orders">주문목록</Link>
    </>
  ),
};
