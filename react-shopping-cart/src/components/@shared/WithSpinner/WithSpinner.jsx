import FlexWrapper from '../FlexWrapper/FlexWrapper';

import Spinner from 'components/@shared/Spinner/Spinner';

function WithSpinner({ isLoading, children }) {
  if (isLoading) {
    return (
      <FlexWrapper height="100vh">
        <Spinner />
      </FlexWrapper>
    );
  }

  return children;
}

export default WithSpinner;
