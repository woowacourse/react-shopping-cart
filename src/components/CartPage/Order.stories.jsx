import Order from 'components/CartPage/Order';

export default {
  title: 'Order',
  component: Order,
};

function Template(args) {
  return <Order {...args} />;
}

export const DefaultOrder = Template.bind({});

DefaultOrder.args = {
  checkedList: [
    {
      id: '11',
      src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000001636]_20210225093600536.jpg',
      price: '4800',
      title: '콜드 브루 몰트',
      quantity: 3,
    },
    {
      id: '33',
      src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[72]_20210415140949967.jpg',
      price: '5500',
      title: '시그니처 핫 초콜릿',
      quantity: 2,
    },
  ],
};
