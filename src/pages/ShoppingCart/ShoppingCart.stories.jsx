import { BrowserRouter } from 'react-router-dom';
import { ShoppingCart } from 'pages';

export default {
  title: 'Pages/ShoppingCart',
  component: ShoppingCart,
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template = args => <ShoppingCart {...args} />;

const DefaultShoppingCart = Template.bind({});

DefaultShoppingCart.args = {};

export { DefaultShoppingCart };
