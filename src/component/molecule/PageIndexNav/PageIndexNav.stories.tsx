import { Meta, Story } from '@storybook/react';
import PageIndexNav, { PageIndexNavProps } from './PageIndexNav';

export default {
  title: 'ShoppingCart/PageIndexNav',
  component: PageIndexNav,
  argTypes: { children: { control: 'text' } },
} as Meta;

const Template: Story<PageIndexNavProps> = (args) => <PageIndexNav {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
