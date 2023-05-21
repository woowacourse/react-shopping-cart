import { Meta, StoryObj } from '@storybook/react';

import Error from '../../components/common/Error/Error';
import { StoryContainerWrapper } from '../styles';

const meta = {
  title: 'ShoppingCart/Common/Error',
  component: Error,
  argTypes: {
    statusCode: { control: 'select', options: [400, 404, 500, undefined] },
  },
  decorators: [
    (Story) => (
      <StoryContainerWrapper>
        <Story />
      </StoryContainerWrapper>
    ),
  ],
} satisfies Meta<typeof Error>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'Error',
  },
};

export const BadRequest: Story = {
  args: {
    message: '잘못된 요청입니다.',
    statusCode: 400,
  },
};

export const NotFound: Story = {
  args: {
    message: '페이지를 찾을 수 없습니다.',
    statusCode: 404,
  },
};

export const InternalServer: Story = {
  args: {
    message: '현재 페이지를 표시할 수 없습니다.',
    statusCode: 500,
  },
};
