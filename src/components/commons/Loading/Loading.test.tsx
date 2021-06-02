import Loading from './Loading';
import { render } from '@testing-library/react';

describe('Loading Component', () => {
  it('Loading Snapshot', () => {
    const LoadingUtil = render(<Loading />);
    expect(LoadingUtil.asFragment()).toMatchSnapshot();
  });
});
