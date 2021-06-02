import React from 'react';
import { render } from '../../../test-utils';
import ProductItem from './ProductItem';

describe('ProductItem 테스트', () => {
  test('matches snapshot', () => {
    const product = {
      productId: 1,
      name: '재밌는 상품',
      price: 50000,
    };

    const utils = render(<ProductItem product={product} />);

    expect(utils.container).toMatchSnapshot();
  });
});
