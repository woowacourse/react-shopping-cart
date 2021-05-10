import React from 'react';
import Header from './index';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';

export default {
  title: 'components/Header',
  component: Header,
};

const Template = args => <Header {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: (
    <>
      <div>
        {' '}
        <Logo height="48px" />
      </div>
      <div>
        <a>주문목록</a>
        <a>장바구니</a>
      </div>
    </>
  ),
};
