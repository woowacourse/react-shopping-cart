import { Meta, Story } from '@storybook/react';
import AmountCounter, { AmountCounterProps } from './AmountCounter';

export default {
  title: 'ShoppingCart/AmountCounter',
  component: AmountCounter,
  argTypes: { children: { control: 'text' } },
} as Meta;

const Template: Story<AmountCounterProps> = (args) => (
  <AmountCounter {...args} />
);

export const Basic = Template.bind({});

Basic.args = {
  min: 1,
  max: 20,
  value: 1,
  onChange: () => {},
  onClickUp: () => alert('수량 증가 버튼 클릭'),
  onClickDown: () => alert('수량 감소 버튼 클릭'),
};
