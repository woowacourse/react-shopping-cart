import { Meta, StoryObj } from '@storybook/react';
import { CartProductCard } from 'components/ProductCardList/ProductCard/CartProductCard';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';

const meta = {
  component: CartProductCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <Story />
        </RecoilRoot>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof CartProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cartProduct: {
      id: 1,
      quantity: 1,
      product: {
        id: 1,
        name: '순살치킨 해마로 1kg 냉동',
        price: 10800,
        imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/28786eaa-d9f0-456c-b318-07236fe17ab2.jpg?h=400&w=400',
      },
    },
  },
};
