import React from 'react';
import { render } from '../../../test-utils';
import OrderItem from './OrderItem';

describe('OrderItem 테스트', () => {
  test('matches snapshot', () => {
    const title = '지그의 다쿠아즈';
    const utils = render(<OrderItem title={title} quantity="5" />);

    expect(utils.container).toMatchSnapshot();
  });
});
