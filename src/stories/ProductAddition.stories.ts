import type { Meta, StoryObj } from '@storybook/react';

import ProductAddition from '../components/ProductAddition/ProductAddition';

const meta = {
  title: 'ShoppingCart/ProductAdditionModal',
  component: ProductAddition,
} satisfies Meta<typeof ProductAddition>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    productInformation: {
      id: 3,
      name: '맛있는 삼겹살',
      price: 10000,
      imageUrl:
        'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201702/27/117f5b49-1d09-4550-8ab7-87c0d82614de.jpg',
    },
    closeModalByClick: () => {},
  },
};
