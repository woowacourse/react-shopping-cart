import type { Meta, StoryObj } from '@storybook/react';
import Header from '../components/Header';
import { StoryContainer } from './styles';
import { HomeButton, BackButton } from '../components/Header/HeaderButton';

const meta: Meta<typeof Header> = {
  title: 'ShoppingCart/Header',
  component: Header,
  parameters: {
    docs: {
      description: {
        component: '장바구니 페이지의 헤더 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    homeButton: {
      control: false,
      description:
        '헤더에 들어갈 버튼의 종류는 Home으로 이동하는 `HomeButton`과 이전 페이지로 이동하는 `BackButton`입니다.',
    },
  },

  tags: ['autodocs'],

  decorators: [
    (Story) => {
      return (
        <StoryContainer>
          <Story />
        </StoryContainer>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const HomeHeader: Story = {
  args: {
    homeButton: <HomeButton />,
  },
};

export const PageHeader: Story = {
  args: {
    homeButton: <BackButton />,
  },
};
