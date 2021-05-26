import { Meta, Story } from '@storybook/react';
import CheckBox, { CheckBoxProps } from './CheckBox';

export default {
  title: 'ShoppingCart/CheckBox',
  component: CheckBox,
  argTypes: { children: { control: 'text' } },
} as Meta;

const Template: Story<CheckBoxProps> = (args) => <CheckBox {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  id: '1',
  onClick: () => {},
  onChange: () => {},
  isChecked: false,
};
