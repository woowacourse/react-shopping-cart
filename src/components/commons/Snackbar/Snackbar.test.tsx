import Snackbar from './Snackbar';
import { render } from '@testing-library/react';

describe('Snackbar Component', () => {
  it('Snackbar Snapshot', () => {
    const snackbarUtil = render(
      <Snackbar isShown={true} duration={700}>
        TEST
      </Snackbar>
    );
    expect(snackbarUtil.asFragment()).toMatchSnapshot();
  });
});
