import TotalPrice from './TotalPrice';
import { render } from '@testing-library/react';

describe('TotalPrice Component', () => {
  it('TotalPrice Snapshot', () => {
    const totalPriceUtil = render(<TotalPrice priceLabel="가격" title="제목" price="1000" />);
    expect(totalPriceUtil.asFragment()).toMatchSnapshot();
  });
});
