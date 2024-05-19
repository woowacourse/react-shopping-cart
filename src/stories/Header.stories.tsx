import type { Meta, StoryObj } from '@storybook/react';
import Header from '../components/Header';
import { StoryContainer } from './styles';

const meta = {
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
    isShowLogo: {
      description:
        '서비스 로고의 노출 여부입니다. 실제 서비스에선 경로에 따라 결정되며, true일 땐 서비스 로고를, false일 땐 뒤로 가기 버튼을 노출합니다.',
    },
  },

  tags: ['autodocs'],

  decorators: [
    (Story) => (
      <StoryContainer>
        <Story />
      </StoryContainer>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isShowLogo: true,
  },
};
