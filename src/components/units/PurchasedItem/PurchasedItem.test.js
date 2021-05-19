import React from 'react';
import { render } from '../../../test-utils';
import PurchasedItem from './PurchasedItem';

describe('PurchasedItem 테스트', () => {
  test('matches snapshot', () => {
    const item = {
      product_id: 1,
      name: '재밌는 상품',
      price: 50000,
      quantity: 5,
    };

    const utils = render(<PurchasedItem item={item} />);

    expect(utils.container).toMatchSnapshot();
  });
});
