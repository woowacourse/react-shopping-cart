import CartPopup from 'components/CartPopup';

export default {
  title: 'components/CartPopup',
  component: CartPopup,
};

const Template = (args) => <CartPopup {...args} />;

export const Example = Template.bind({});

Example.args = {
  isCartPopupShow: 'true',
  isInCart: 'true',
};
