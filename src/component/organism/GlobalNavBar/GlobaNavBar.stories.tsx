import { Meta } from '@storybook/react';
import GlobalNavbar from './GlobalNavBar';

export default {
  title: 'ShoppingCart/GlobalNavbar',
  component: GlobalNavbar,
} as Meta;

const Template = ({ ...args }) => <GlobalNavbar {...args} />;

export const Basic = Template.bind({});
