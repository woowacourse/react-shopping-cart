import React from 'react';
import Product from './index';
import itemImage from '../../../assets/images/product-item01.png';

export default {
  title: 'components/shared/Product',
  component: Product,
};

const Template = args => <Product {...args} />;

export const Default = Template.bind({});

Default.args = {
  thumbnail: {
    image: itemImage,
    alt: '임시 이미지',
    size: 'small',
  },
  information: {
    title:
      '상품이름은 최대 2줄입니다. 상품이름은 최대 2줄입니다. 상품이름은 최대 2줄입니다. 상품이름은 최대 2줄입니다. 상품이름은 최대 2줄입니다. 상품이름은 최대 2줄입니다. 상품이름은 최대 2줄입니다. 상품이름은 최대 2줄입니다. 상품이름은 최대 2줄입니다. 상품이름은 최대 2줄입니다. ',
    description: <>1000원/수량 : 2개</>,
  },
  extra: (
    <>
      <button type="button" style={{ width: '130px' }}>
        삭제
      </button>
      <p style={{ margin: 0, fontSize: '1.5rem' }}>10,000,000 원</p>
    </>
  ),
};
