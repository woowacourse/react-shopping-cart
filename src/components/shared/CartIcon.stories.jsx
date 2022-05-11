import { ReactComponent as CartIcon } from './CartIcon.svg';
import { CART_SIZE, COLOR } from '../../constants';

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

export const LogoCartIcon = Template.bind({});

LogoCartIcon.args = {
  width: CART_SIZE.LARGE.WIDTH,
  height: CART_SIZE.LARGE.HEIGHT,
  fill: COLOR.WHITE,
};

export const CartButton = Template.bind({});

CartButton.args = {
  width: CART_SIZE.SMALL.WIDTH,
  height: CART_SIZE.SMALL.HEIGHT,
  fill: COLOR.BLACK,
};

export const ClickedCartButton = Template.bind({});

ClickedCartButton.args = {
  width: CART_SIZE.SMALL.WIDTH,
  height: CART_SIZE.SMALL.HEIGHT,
  fill: COLOR.PRIMARY,
};
