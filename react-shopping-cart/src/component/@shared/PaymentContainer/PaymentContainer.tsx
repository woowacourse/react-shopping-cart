import ExpectedPaymentBox from "component/@shared/PaymentBox/PaymentBox";
import OrderButton from "component/@shared/OrderButton/OrderButton";
import {
  ExpectedPaymentTopContainer,
  ExpectedPaymentBottomContainer,
  ExpectedPaymentWrapper,
} from "./PaymentContainer.style";

function ExpectedPaymentContainer({
  totalPaymentCost,
  label,
  buttonText,
}: {
  totalPaymentCost: number;
  label: string;
  buttonText: string;
}) {
  return (
    <ExpectedPaymentWrapper>
      <ExpectedPaymentTopContainer>{label}</ExpectedPaymentTopContainer>
      <ExpectedPaymentBottomContainer>
        <ExpectedPaymentBox price={totalPaymentCost}>
          {label}
        </ExpectedPaymentBox>
        <OrderButton>{buttonText}</OrderButton>
      </ExpectedPaymentBottomContainer>
    </ExpectedPaymentWrapper>
  );
}

export default ExpectedPaymentContainer;
