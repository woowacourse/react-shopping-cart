import FlexWrapper from '../FlexWrapper/FlexWrapper';

import Spinner from 'components/@shared/Spinner/Spinner';

function WithSpinner({ loading, children }) {
  if (loading) {
    return (
      <FlexWrapper height="100vh">
        <Spinner />
      </FlexWrapper>
    );
  }

  return children;
}

export default WithSpinner;
