import PageTitle from './PageTitle';
import { render } from '@testing-library/react';

describe('PageTitle Component', () => {
  it('PageTitle Snapshot', () => {
    const pageTitleUtil = render(<PageTitle>TEST</PageTitle>);
    expect(pageTitleUtil.asFragment()).toMatchSnapshot();
  });
});
