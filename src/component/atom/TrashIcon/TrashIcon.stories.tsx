import { Meta, Story } from '@storybook/react';
import TrashCanIcon, { TrashCanIconProps } from './TrashIcon';

export default {
  title: 'ShoppingCart/TrashCanIcon',
  component: TrashCanIcon,
} as Meta;

const Template: Story<TrashCanIconProps> = ({ ...args }) => (
  <TrashCanIcon {...args} />
);

export const Basic = Template.bind({});

Basic.args = {
  scale: '1.0',
};
