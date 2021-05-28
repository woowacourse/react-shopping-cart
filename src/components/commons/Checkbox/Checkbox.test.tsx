import Checkbox from './Checkbox';
import { render } from '@testing-library/react';

describe('Checkbox Component', () => {
  it('Checkbox Snapshot', () => {
    const checkboxUtil = render(<Checkbox />);
    expect(checkboxUtil.asFragment()).toMatchSnapshot();
  });
});
