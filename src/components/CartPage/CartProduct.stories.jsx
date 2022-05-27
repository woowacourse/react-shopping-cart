import CartProduct from 'components/CartPage/CartProduct';

export default {
  title: 'CartProduct',
  component: CartProduct,
  argTypes: {
    updateCheckedList: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '736px' }}>
        <Story />
      </div>
    ),
  ],
};

function Template(args) {
  return <CartProduct {...args} />;
}

export const DefaultCartProduct = Template.bind({});

DefaultCartProduct.args = {
  product: {
    id: '11',
    price: '4800',
    src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000001636]_20210225093600536.jpg',
    title: '콜드 브루 몰트',
    quantity: 3,
  },
  checked: true,
  updateCheckedList: () => {},
};
