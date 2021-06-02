import NumberInput from './NumberInput';
import { render } from '@testing-library/react';

describe('NumberInput Component', () => {
  it('NumberInput Snapshot', () => {
    const numberInputUtil = render(<NumberInput />);
    expect(numberInputUtil.asFragment()).toMatchSnapshot();
  });
});
