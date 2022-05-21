import AmountController from 'components/CartPage/AmountController';

export default {
  title: 'AmountController',
  component: AmountController,
};

function Template(args) {
  return <AmountController {...args} />;
}

export const DefaultController = Template.bind({});

DefaultController.args = {
  product: {
    id: '11',
    src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000001636]_20210225093600536.jpg',
    price: '4800',
    title: '콜드 브루 몰트',
    quantity: 3,
  },
};
