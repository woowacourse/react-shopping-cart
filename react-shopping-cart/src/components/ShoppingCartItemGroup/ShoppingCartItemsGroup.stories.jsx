import ShoppingCartItemGroup from 'components/ShoppingCartItemGroup/ShoppingCartItemGroup';

export default {
  title: 'ShoppingCartItemGroup',
  component: ShoppingCartItemGroup,
};

export const DefaultShoppingCartItemGroup = (args) => (
  <ShoppingCartItemGroup {...args} />
);
DefaultShoppingCartItemGroup.args = {
  carts: [
    {
      name: '[든든] 기분 시로가마보코 160g',
      price: 2800,
      id: 'sming7',
      thumbnail:
        'https://cdn-mart.baemin.com/goods/custom/20200525/11315-main-01.png',
      user: 'sming',
    },
    {
      name: '[든든] 흑곤약 250g',
      price: 1300,
      id: 'sming4',
      thumbnail:
        'https://cdn-mart.baemin.com/goods/custom/20200525/11263-main-01.png',
      user: 'sming',
    },
    {
      name: '[든든] 냉동조미유부삼각 (60장) 1kg',
      price: 8400,
      id: 'sming8',
      thumbnail:
        'https://cdn-mart.baemin.com/goods/custom/20200525/11323-main-01.png',
      user: 'sming',
    },
  ],
};
