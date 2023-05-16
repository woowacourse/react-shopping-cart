import { Meta, StoryObj } from '@storybook/react';
import ProductCard from 'components/ProductCardList/ProductCard/ProductCard';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';

const meta = {
  component: ProductCard,
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
} satisfies Meta<typeof ProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: {
      id: 1,
      name: '순살치킨 해마로 1kg 냉동',
      price: 10800,
      imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/28786eaa-d9f0-456c-b318-07236fe17ab2.jpg?h=400&w=400',
    },
  },
};
