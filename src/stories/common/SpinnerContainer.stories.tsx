import { Meta, StoryObj } from '@storybook/react';

import SpinnerContainer from '../../components/common/SpinnerContainer/SpinnerContainer';
import { StoryContainerWrapper } from '../styles';

const meta = {
  title: 'ShoppingCart/Common/SpinnerContainer',
  component: SpinnerContainer,
  argTypes: {
    disabled: {
      control: false,
    },
  },
  args: {
    message: 'Loading',
    timing: 1,
    size: 50,
    width: 5,
  },
  decorators: [
    (Story) => (
      <StoryContainerWrapper>
        <Story />
      </StoryContainerWrapper>
    ),
  ],
} satisfies Meta<typeof SpinnerContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
