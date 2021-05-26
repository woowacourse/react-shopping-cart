import { Meta, Story } from '@storybook/react';
import Button, { ButtonProps } from './Button';

export default {
  title: 'ShoppingCart/Button',
  component: Button,
  argTypes: { children: { control: 'text' } },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: '장바구니',
};
