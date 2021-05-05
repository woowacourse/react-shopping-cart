import React from 'react';
import Checkbox from '.';
import Product from '../Product';

export default {
  title: 'Shared/Checkbox',
  component: Checkbox,
  argTypes: {},
};

const Template = (args) => <Checkbox {...args} />;

export const LabelCenter = Template.bind({});
LabelCenter.args = {
  children: '전체 선택',
  align: 'center',
};

export const LabelFlexStart = Template.bind({});
LabelFlexStart.args = {
  children: (
    <Product imageUrl={`${process.env.PUBLIC_URL}/logo512.png`} alt={'default image'} size={'10rem'} direction={'row'}>
      <p>리액트</p>
    </Product>
  ),
  align: 'flex-start',
};
