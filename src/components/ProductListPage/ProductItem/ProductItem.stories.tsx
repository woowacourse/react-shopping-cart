import type { Meta, StoryObj } from '@storybook/react';
import ProductItemWrapper from './ProductItemWrapper.tsx';

const meta: Meta<typeof ProductItemWrapper> = {
  title: 'ProductItem',
  component: ProductItemWrapper,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: 6,
    name: '[온라인단독] mini 하트 도형 14k 반지',
    price: 49900,
    imageUrl: 'http://image.elandgift.com/images/web/Product/20211123/JW20211123083458889001.jpg',
  },
};
