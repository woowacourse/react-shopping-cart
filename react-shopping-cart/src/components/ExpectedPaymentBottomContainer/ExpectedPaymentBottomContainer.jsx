import FlexWrapper from 'components/@shared/FlexWrapper/FlexWrapper';

//재사용X
function ExpectedPaymentBottomContainer({ children }) {
  return (
    <FlexWrapper flexDirection="column" gap="42px" padding="20px" width="100%">
      {children}
    </FlexWrapper>
  );
}

export default ExpectedPaymentBottomContainer;
