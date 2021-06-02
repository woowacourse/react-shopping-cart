import React from 'react';
import { render } from '../../../test-utils';
import PriceOverview from './PriceOverview';

describe('PriceOverview 테스트', () => {
  test('matches snapshot', () => {
    const headerText = '장바구니 목록';
    const utils = render(<PriceOverview headerText={headerText} />);

    expect(utils.container).toMatchSnapshot();
  });
});
