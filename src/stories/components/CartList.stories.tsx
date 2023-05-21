import type { Meta, StoryObj } from '@storybook/react';
import CartList from '../../components/cart/CartList';
import { handlers } from '../../mocks/handlers';
import { CartListWrapper } from '../../style/ContentLayout';
import { styled } from 'styled-components';

const meta = {
  title: 'ShoppingCart/cart/CartList',
  component: CartList,
  parameters: {
    msw: handlers,
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <S.Wrapper>
          <Story />
        </S.Wrapper>
      );
    },
  ],
} satisfies Meta<typeof CartList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const S = {
  Wrapper: styled(CartListWrapper)`
    width: calc(100vw - 16vw);
    
  `
}
