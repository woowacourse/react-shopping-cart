import { RowFlexWrapper } from "styles/Wrapper";
import Spinner from "component/@shared/Spinner/Spinner";
import { ReactNode } from "react";

function WithSpinner({
  loading,
  children,
}: {
  loading: boolean;
  children: ReactNode;
}) {
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
