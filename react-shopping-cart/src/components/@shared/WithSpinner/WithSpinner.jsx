import Spinner from 'components/@shared/Spinner/Spinner';

import { RowFlexWrapper } from 'styles/Wrapper';

function WithSpinner({ loading, children }) {
  if (loading) {
    return (
      <RowFlexWrapper height="100vh">
        <Spinner />
      </RowFlexWrapper>
    );
  }

  return children;
}

export default WithSpinner;
