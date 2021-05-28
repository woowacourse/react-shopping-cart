import Snackbar from './Snackbar';
import { render } from '@testing-library/react';

describe('Snackbar Component', () => {
  it('Snackbar Snapshot', () => {
    const snackbarUtil = render(<Snackbar>TEST</Snackbar>);
    expect(snackbarUtil.asFragment()).toMatchSnapshot();
  });
});
