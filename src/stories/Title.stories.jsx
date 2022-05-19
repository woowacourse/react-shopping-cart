import React from 'react';

import Title from 'components/Title';
import SubTitle from 'components/SubTitle';

export default {
  title: 'component/Title',
  component: Title,
};

const Template = () => <Title>타이틀</Title>;
const CartTemplate = () => <Title>장바구니</Title>;

const SubTitleTemplate = () => <SubTitle>서브 타이틀</SubTitle>;
const CartListSubTitleTemplate = () => <SubTitle>든든배송 상품 (3개)</SubTitle>;

export const Primary = Template.bind({});
export const CartPrimary = CartTemplate.bind({});

export const SubTitlePrimary = SubTitleTemplate.bind({});
export const CartListSubTitlePrimary = CartListSubTitleTemplate.bind({});
