import { Meta, Story } from '@storybook/react';
import ColumnProductItem, { ColumnProductItemProps } from './ColumnProductItem';

export default {
  title: 'ShoppingCart/ColumnProductItem',
  component: ColumnProductItem,
  argTypes: { children: { control: 'text' } },
} as Meta;

const Template: Story<ColumnProductItemProps> = (args) => (
  <ColumnProductItem {...args} />
);

export const Basic = Template.bind({});

Basic.args = {
  name: '브랜',
  price: 100,
  image_url:
    'https://zereight.github.io/react-payments/static/media/pullup.befeeb55.gif',
  onClickShoppingCartButton: () => {
    alert('장바구니 버튼 클릭');
  },
  onClickLikeButton: () => {
    alert('장바구니 이동 버튼 클릭');
  },
};
