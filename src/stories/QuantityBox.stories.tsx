import { ComponentMeta, ComponentStory } from '@storybook/react';
import QuantityBox from 'components/Cart/QuantityBox';
import React from 'react';

export default {
  component: QuantityBox,
  title: 'QuantityBox',
} as ComponentMeta<typeof QuantityBox>;

const Template = args => <QuantityBox {...args} />;

export const Large: ComponentStory<typeof QuantityBox> = Template.bind({});
