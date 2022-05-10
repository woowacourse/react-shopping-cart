import CartIcon from './CartIcon';
import { CART_ICON_SIZE } from '../../../constants';

export default {
  title: 'CartIcon',
  component: CartIcon,
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#eee' }}>
        <Story />
      </div>
    ),
  ],
};

function Template(args) {
  return <CartIcon {...args} />;
}

export const HeaderCartIcon = Template.bind({});

HeaderCartIcon.args = {};

export const CartIconButton = Template.bind({});

CartIconButton.args = {
  size: CART_ICON_SIZE.SMALL,
  color: 'black',
};

export const ClickedCartIconButton = Template.bind({});

ClickedCartIconButton.args = {
  size: CART_ICON_SIZE.SMALL,
  color: '#2AC1BC',
};
