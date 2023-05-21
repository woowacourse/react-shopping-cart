import { Meta, StoryObj } from '@storybook/react';
import SelectedProductItemComponent from '../../components/cart/SelectedProductItem';

const meta = {
  component: SelectedProductItemComponent,
  title: 'Components/Cart/SelectedProductItem',
  tags: ['autodocs'],
} satisfies Meta<typeof SelectedProductItemComponent>;

export default meta;

type Story = StoryObj<typeof SelectedProductItemComponent>;

export const SelectedProductItem: Story = {
  args: {
    id: 1,
    imageUrl: `${process.env.PUBLIC_URL}/assets/product1.svg`,
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
    quantity: 1,
  },

  argTypes: {
    id: {
      control: {
        type: 'number',
        min: 1,
      },
      description: '상품의 고유한 `id`입니다.',
    },

    imageUrl: {
      options: Array.from({ length: 8 }).map((_, index) => `/assets/product${index + 1}.svg`),
      control: {
        type: 'select',
      },
      description: '상품의 사진을 바꿀 수 있습니다.',
    },

    name: {
      description: '상품의 이름을 설정할 수 있습니다.',
    },

    price: {
      control: {
        type: 'number',
        min: 1,
      },
      description: '상품의 가격을 설정할 수 있습니다.',
    },

    quantity: {
      control: {
        type: 'number',
        min: 1,
      },
      description: '상품의 수량을 바꿀 수 있습니다.<br> 수량을 변경하면 상품의 가격도 변경됩니다.',
    },
  },
};
