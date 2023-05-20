import { Meta, StoryObj } from '@storybook/react';
import CartList from '.';
import { usePostFetch } from 'src/hooks/useFetch';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { cartListAtom } from 'src/recoil/cartList';

const mockData = {
  cartList: [
    {
      id: 1,
      quantity: 1,
      isSelected: true,
      product: {
        id: 1,
        price: 10000,
        name: '똥 춘식이',
        imageUrl:
          'https://item.kakaocdn.net/do/91481c46c6ee38c33e20deba29e1f73f82f3bd8c9735553d03f6f982e10ebe70',
      },
    },
    {
      id: 2,
      quantity: 1,
      isSelected: true,
      product: {
        id: 2,
        price: 10000,
        name: '힝 춘식이',
        imageUrl:
          'https://item.kakaocdn.net/do/91481c46c6ee38c33e20deba29e1f73f15b3f4e3c2033bfd702a321ec6eda72c',
      },
    },
  ],
};

const cartList = {
  component: CartList,
  title: 'Cart/CartList',
  tags: ['autodocs'],
} satisfies Meta<typeof CartList>;

export default cartList;

type Story = StoryObj<typeof cartList>;

export const Default: Story = {
  args: {},
  render: () => {
    const { cartList } = mockData;
    const { postData } = usePostFetch();
    const setCartList = useSetRecoilState(cartListAtom);
    useEffect(() => {
      for (const { id } of cartList) {
        postData('/api/cart-items', { productId: id });
      }

      setCartList(cartList);
    }, []);

    return <CartList />;
  },
};
