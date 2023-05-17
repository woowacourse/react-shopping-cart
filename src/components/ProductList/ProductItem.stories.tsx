import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { PRODUCT_LIST } from 'mockData/productList';
import ProductItem from './ProductItem';

const meta: Meta<typeof ProductItem> = {
  title: 'ProductItem',
  component: ProductItem,
};

export default meta;
type Story = StoryObj<typeof ProductItem>;

export const Default: Story = {
  args: {
    product: {
      id: 1,
      name: '콜라',
      price: 1600,
      imageUrl: PRODUCT_LIST.productList[0].imageUrl,
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('장바구니 버튼을 클릭해 추가한다.', () => {
      userEvent.click(canvas.getByLabelText('장바구니 버튼'));
    });

    await step('버튼을 클릭해 장바구니 갯수를 올린다.', () => {
      userEvent.click(canvas.getByLabelText('장바구니 수량 증가 버튼'));
    });

    await step('버튼을 클릭해 장바구니 갯수를 내린다.', () => {
      userEvent.click(canvas.getByLabelText('장바구니 수량 감소 버튼'));
    });

    await step(
      '버튼을 클릭해 장바구니 갯수를 0으로 만들고 장바구니 버튼으로 돌아간다.',
      () => {
        userEvent.click(canvas.getByLabelText('장바구니 수량 감소 버튼'));
      }
    );
  },
};
