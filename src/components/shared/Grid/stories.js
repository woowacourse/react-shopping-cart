import React from 'react';
import Grid from './index';
import Card from '../Card';
import itemImage from '../../../assets/images/product-item01.png';

export default {
  title: 'components/shared/Grid',
  component: Grid,
};

const Template = args => <Grid {...args} />;

export const Default = Template.bind({});

Default.args = {
  col: 4,
  children: Array.from({ length: 18 }).map(() => (
    <Card
      thumbnail={{ image: itemImage, alt: '임시이미지' }}
      title="상품이름은 최대 2줄입니다. 상품이름은 최대 2줄입니다. 상품이름은 최대 2줄입니다. 상품이름은 최대 2줄입니다 "
      description={
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>12,000원</span>
          <button>장바구니</button>
        </div>
      }
    ></Card>
  )),
};
