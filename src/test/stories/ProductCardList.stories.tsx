import { Meta, StoryObj } from '@storybook/react';
import ProductCardList from 'components/ProductCardList/ProductCardList';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';

const meta = {
  tags: ['autodocs'],
  title: 'ProductCardList',
  component: ProductCardList,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ProductCardList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
