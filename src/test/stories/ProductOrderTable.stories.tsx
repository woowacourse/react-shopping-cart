import { Meta, StoryObj } from '@storybook/react';
import { ProductOrderTable } from 'components/Payments/ProductOrderTable';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';

const meta = {
  tags: ['autodocs'],
  component: ProductOrderTable,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ProductOrderTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
