import { Meta, Story } from '@storybook/react';
import CloseIcon, { CloseIconProps } from './CloseIcon';

export default {
  title: 'ShoppingCart/CloseIcon',
  component: CloseIcon,
} as Meta;

const Template: Story<CloseIconProps> = ({ ...args }) => (
  <CloseIcon {...args} />
);

export const Basic = Template.bind({});

Basic.args = {
  scale: '1.0',
};
