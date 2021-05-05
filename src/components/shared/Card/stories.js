import React from 'react';
import Card from './index';
import itemImage from '../../../assets/images/product-item01.png';

export default {
  title: 'components/shared/Card',
  component: Card,
};

const Template = args => <Card {...args} />;

export const Default = Template.bind({});
export const WithDescription = Template.bind({});

Default.args = {
  image: itemImage,
  title:
    '상품이름은 최대 2줄입니다. 상품이름은 최대 2줄입니다. 상품이름은 최대 2줄입니다. 상품이름은 최대 2줄입니다.',
};

WithDescription.args = {
  image: itemImage,
  title:
    '상품이름은 최대 2줄입니다. 상품이름은 최대 2줄입니다. 상품이름은 최대 2줄입니다. 상품이름은 최대 2줄입니다.',
  description: (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>12,000원</span>
      <button>장바구니</button>
    </div>
  ),
};
