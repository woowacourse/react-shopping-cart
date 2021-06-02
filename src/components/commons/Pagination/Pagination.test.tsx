import Pagination from './Pagination';
import { render } from '@testing-library/react';

describe('Pagination Component', () => {
  it('Pagination Snapshot', () => {
    const onNextButtonClick = () => {
      console.log('onNextButtonClick');
    };

    const onPaginationButtonClick = () => {
      console.log('onPaginationButtonClick');
    };

    const onPrevButtonClick = () => {
      console.log('onPrevButtonClick');
    };

    const pageTitleUtil = render(
      <Pagination
        onNextButtonClick={onNextButtonClick}
        onPaginationButtonClick={onPaginationButtonClick}
        onPrevButtonClick={onPrevButtonClick}
      />
    );
    expect(pageTitleUtil.asFragment()).toMatchSnapshot();
  });
});
