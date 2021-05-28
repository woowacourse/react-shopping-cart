import BackDrop from './BackDrop';
import { render } from '@testing-library/react';

describe('BackDrop Component', () => {
  it('BackDrop Snapshot', () => {
    const backDropUtil = render(<BackDrop />);
    expect(backDropUtil.asFragment()).toMatchSnapshot();
  });
});
