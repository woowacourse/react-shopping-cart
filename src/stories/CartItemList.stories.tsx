import type { Meta, StoryObj } from '@storybook/react';
import { customViewPorts } from '../../.storybook/preview';

import GlobalStyle from '../GlobalStyle';

import { RecoilRoot } from 'recoil';

import { CartItemList } from '../components/CartItemList';
import { LOCAL_STORAGE_KEY } from '../constants';

const meta = {
  title: 'ShoppingCart/CartItemList',
  component: CartItemList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      const mockCart = [
        {
          id: 1,
          quantity: 5,
          product: {
            id: 1,
            name: '지구',
            price: 1000,
            imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/28/earth-11009__480.jpg',
          },
        },
        {
          id: 2,
          quantity: 5,
          product: {
            id: 2,
            name: '화성',
            price: 200000,
            imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/30/mars-11012__480.jpg',
          },
        },
        {
          id: 3,
          quantity: 5,
          product: {
            id: 3,
            name: '달',
            price: 300,
            imageUrl: 'https://cdn.pixabay.com/photo/2016/04/02/19/40/moon-1303512__480.png',
          },
        },
        {
          id: 4,
          quantity: 5,
          product: {
            id: 4,
            name: '해왕성',
            price: 10000,
            imageUrl: 'https://cdn.pixabay.com/photo/2020/09/06/22/11/neptune-5550216__480.jpg',
          },
        },
      ];
      localStorage.setItem(LOCAL_STORAGE_KEY.CART_STATE, JSON.stringify(mockCart));

      return (
        <div>
          <GlobalStyle />
          <RecoilRoot>
            <Story />
          </RecoilRoot>
        </div>
      );
    },
  ],
} satisfies Meta<typeof CartItemList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      Default: customViewPorts.Mobile,
      defaultViewport: 'Mobile',
    },
  },
};
