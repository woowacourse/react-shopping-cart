import { Meta, StoryObj } from '@storybook/react';
import CheckBox from '.';
import theme from 'src/styles/theme';

const checkBox = {
  component: CheckBox,
  title: 'Common/CheckBox',
  tags: ['autodocs'],
} satisfies Meta<typeof CheckBox>;

export default checkBox;

type Story = StoryObj<typeof checkBox>;

export const Default: Story = {
  args: {
    backgroundColor: theme.color.secondary,
    children: <p>체크박스 입니다 하하하</p>,
  },
};
