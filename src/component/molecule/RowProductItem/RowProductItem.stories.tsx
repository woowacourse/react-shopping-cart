import { Meta, Story } from '@storybook/react';
import RowProductItem, { RowProductItemProps } from './RowProductItem';

export default {
  title: 'ShoppingCart/RowProductItem',
  component: RowProductItem,
  argTypes: { children: { control: 'text' } },
} as Meta;

const Template: Story<RowProductItemProps> = (args) => (
  <RowProductItem {...args} />
);

export const Basic = Template.bind({});

Basic.args = {
  name: '브랜의 풀업 셋트',
  price: 100,
  quantity: 1,
  image_url:
    'https://zereight.github.io/react-payments/static/media/pullup.befeeb55.gif',
};
