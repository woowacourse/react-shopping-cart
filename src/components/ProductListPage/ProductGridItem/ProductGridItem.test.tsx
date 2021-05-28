import ProductGridItem from './ProductGridItem';
import { render } from '@testing-library/react';

describe('ProductGridItem Component', () => {
  it('ProductGridItem Snapshot', () => {
    const productGridItemUtil = render(<ProductGridItem price="2000" name="이름" thumbnail=""></ProductGridItem>);
    expect(productGridItemUtil.asFragment()).toMatchSnapshot();
  });
});
