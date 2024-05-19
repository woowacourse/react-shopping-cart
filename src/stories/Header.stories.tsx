import type { Meta, StoryObj } from '@storybook/react';
import Header from '../components/Header';
import { StoryContainer } from './styles';
import { ThemeProvider } from '@emotion/react';
import theme from '../styles/theme';

const meta = {
  title: 'ShoppingCart/Header',
  component: Header,
  args: {
    isShowLogo: true,
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <StoryContainer>
          <Story />
        </StoryContainer>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
