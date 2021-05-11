import ColumnProductItem from './ColumnProductItem';

export default {
  title: 'ShoppingCart/ColumnProductItem',
  component: ColumnProductItem,
  argTypes: { children: { control: 'text' } },
};

const Template = args => <ColumnProductItem {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  name: '브랜',
  price: '100',
  imgSrc: 'https://zereight.github.io/react-payments/static/media/pullup.befeeb55.gif',
  onClick: () => {
    alert('장바구니 버튼 클릭');
  },
};
