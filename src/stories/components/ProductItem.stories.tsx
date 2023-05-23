import { Meta, StoryObj } from '@storybook/react';
import ProductItemComponent from '../../components/main/ProductItem';

const meta = {
  component: ProductItemComponent,
  title: 'Components/Main/ProductItem',
  tags: ['autodocs'],
} satisfies Meta<typeof ProductItemComponent>;

export default meta;

type Story = StoryObj<typeof ProductItemComponent>;

export const ProductItem: Story = {
  args: {
    id: 1,
    imageUrl: `${process.env.PUBLIC_URL}/assets/product1.svg`,
    name: 'PET보틀-정사각(420ml)',
    price: 43400,
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
  },
};
