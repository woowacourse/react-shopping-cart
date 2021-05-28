import NotFound from './NotFound';
import { render } from '@testing-library/react';

describe('NotFound Component', () => {
  it('NotFound Snapshot', () => {
    const notFoundUtil = render(<NotFound message="테스트 메세지" />);
    expect(notFoundUtil.asFragment()).toMatchSnapshot();
  });
});
