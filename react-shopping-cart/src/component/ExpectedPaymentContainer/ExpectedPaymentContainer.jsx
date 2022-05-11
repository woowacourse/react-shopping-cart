import styled from "styled-components";
import ExpectedPaymentTopContainer from "../ExpectedPaymentTopContainer/ExpectedPaymentTopContainer";
import ExpectedPaymentBottomContainer from "../ExpectedPaymentBottomContainer/ExpectedPaymentBottomContainer";
import ExpectedPaymentBox from "../ExpectedPaymentBox/ExpectedPaymentBox";
import OrderButton from "../OrderButton/OrderButton";

const ExpectedPaymentWrapper = styled.div`
  border: 1px solid;
  margin-bottom: 
  border-color: ${({ theme }) => theme.colors["gray_04"]};
`;

function ExpectedPaymentContainer() {
  return (
    <ExpectedPaymentWrapper>
      <ExpectedPaymentTopContainer>결제예상금액</ExpectedPaymentTopContainer>
      <ExpectedPaymentBottomContainer>
        <ExpectedPaymentBox price="23,200" />
        <OrderButton>주문하기(2개)</OrderButton>
      </ExpectedPaymentBottomContainer>
    </ExpectedPaymentWrapper>
  );
}

export default ExpectedPaymentContainer;
