import { Meta, StoryObj } from '@storybook/react';

import CartCheckoutBox from '../../components/cart/CartCheckoutBox/CartCheckoutBox';
import { CART_LIST_LOCAL_STORAGE_KEY } from '../../constants';
import { saveToLocalStorage } from '../../utils/localStorage';

const meta = {
  title: 'ShoppingCart/Cart/CartCheckoutBox',
  component: CartCheckoutBox,
} satisfies Meta<typeof CartCheckoutBox>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockCartListData = [
  {
    id: 1684161725526,
    quantity: 7,
    product: {
      id: 2,
      name: '올인원 세트-물티수저',
      price: 57600,
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/list/dcee7c3b-230f-482b-a549-ee0ee678222e.jpg?h=400&w=400',
    },
  },
  {
    id: 1684161727333,
    quantity: 1,
    product: {
      id: 3,
      name: '종이용기(900cc)-너무맛있겠다',
      price: 46200,
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/list/4ece565d-7fbf-4af4-b4a0-e545c15eda10.jpg?h=400&w=400',
    },
  },
  {
    id: 1684161728982,
    quantity: 1,
    product: {
      id: 8,
      name: '아이스팩-얼음',
      price: 24400,
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/list/d27ec68b-4ba0-442d-8233-e844edd794a1.jpg?h=400&w=400',
    },
  },
];

export const Default: Story = {
  decorators: [
    (Story) => {
      saveToLocalStorage(CART_LIST_LOCAL_STORAGE_KEY, mockCartListData);
      return <Story />;
    },
  ],
};

export const Empty: Story = {};
