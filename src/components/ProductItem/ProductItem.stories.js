import ProductItem from './ProductItem';

export default {
  title: 'ShoppingCart/ProductItem',
  component: ProductItem,
  argTypes: { children: { control: 'text' } },
};

const Template = args => <ProductItem {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  name: '브랜',
  price: 100,
  imgSrc: 'https://zereight.github.io/react-payments/static/media/pullup.befeeb55.gif',
  onClick: () => {
    alert('장바구니 버튼 클릭');
  },
};
