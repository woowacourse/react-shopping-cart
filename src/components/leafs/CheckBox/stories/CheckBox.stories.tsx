import type { StoryFn } from '@storybook/react';
import CheckBox from '../CheckBox';

export default {
  title: 'CheckBox',
  component: CheckBox,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

const Template: StoryFn<React.ComponentProps<typeof CheckBox>> = (props) => <CheckBox {...props} />;

export const DefaultCheckBox = Template.bind({});
DefaultCheckBox.args = {};

export const CheckedCheckBox = Template.bind({});
CheckedCheckBox.args = {
  checked: true,
  onClick: () => undefined,
};
