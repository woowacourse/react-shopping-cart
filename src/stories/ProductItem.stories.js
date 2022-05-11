import ProductItem from '../components/ProductItem';

export default {
  title: 'Component/ProductItem',
  component: ProductItem,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => <ProductItem {...args} />;

export const Compy = Template.bind({});
Compy.args = {
  companyName: '콤피 카드 🦖',
  cardNumber: ['1234', '1234', '1234', '1234'],
  userName: 'COMPY RYU',
  expireMonth: '05',
  expireYear: '28',
};
