import HomeButton from 'components/HomeButton/HomeButton';

import { ReactComponent as Cart } from 'assets/cart.svg';

export default {
  title: 'HomeButton',
  component: HomeButton,
  decorators: [
    (Story) => (
      <div
        style={{
          background: 'black',
          width: '600px',
          height: '100px',
          textAlign: 'center',
          lineHeight: '100px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const DefaultShoppingCartTitle = (args) => (
  <HomeButton {...args}></HomeButton>
);
DefaultShoppingCartTitle.args = {
  children: [<Cart />, <div>WOOWA SHOP</div>],
};
