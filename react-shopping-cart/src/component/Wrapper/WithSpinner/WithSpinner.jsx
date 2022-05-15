import { RowFlexWrapper } from "styles/Wrapper";
import Spinner from "component/@shared/Spinner/Spinner";

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
