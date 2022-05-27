import CartContainer from 'components/Cart/CartContainer/CartContainer';
import CartItem from 'components/Cart/CartItem/CartItem';
import { productList } from 'assets/mock';

export default {
  title: 'components/CartContainer',
  component: CartContainer,
};

const Template = (args) => <CartContainer {...args} />;

export const Example = Template.bind({});
const cartItems = productList.map((product, index) => (
  <CartItem
    key={index}
    name={product.name}
    price={product.price}
    imgUrl={product.imgUrl}
    quantity={1}
  />
));

Example.args = {
  children: cartItems,
};
