import React from 'react';
import { render } from '../../../test-utils';
import CartItem from './CartItem';
import defaultImageUrl from '../../../assets/images/default_product_item.png';

describe('CartItem 테스트', () => {
  test('matches snapshot', () => {
    const cartItem = {
      id: 1231234,
      product: {
        id: 123123,
        name: '맛있는 아쌈 밀크티',
        price: 10000,
        image: defaultImageUrl,
      },
      quantity: 3,
      checked: true,
    };

    const utils = render(<CartItem cartItem={cartItem} />);

    expect(utils.container).toMatchSnapshot();
  });
});
