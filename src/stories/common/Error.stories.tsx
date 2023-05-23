import { Meta, StoryObj } from '@storybook/react';

import Error from '../../components/common/Error/Error';
import { HTTP_ERROR_MESSAGE, HTTP_STATUS_CODE } from '../../constants/api';
import { StoryContainerWrapper } from '../styles';

const meta = {
  title: 'ShoppingCart/Common/Error',
  component: Error,
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
    information: HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.BAD_REQUEST],
  },
};

export const NotFound: Story = {
  args: {
    message: '페이지를 찾을 수 없습니다.',
    information: HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.NOT_FOUND],
  },
};

export const InternalServer: Story = {
  args: {
    message: '현재 페이지를 표시할 수 없습니다.',
    information: HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR],
  },
};
