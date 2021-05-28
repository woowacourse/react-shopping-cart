import Tooltip from './Tooltip';
import { render } from '@testing-library/react';

describe('Tooltip Component', () => {
  it('Tooltip Snapshot', () => {
    const tooltipUtil = render(<Tooltip timeOut={0}>TEST</Tooltip>);
    expect(tooltipUtil.asFragment()).toMatchSnapshot();
  });
});
