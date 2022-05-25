import PaymentBox from "component/@shared/PaymentBox/PaymentBox";
import OrderButton from "component/@shared/OrderButton/OrderButton";
import {
  PaymentTopContainer,
  PaymentBottomContainer,
  PaymentWrapper,
} from "./PaymentContainer.style";

function PaymentContainer({
  totalPaymentCost,
  label,
  buttonText,
  handleOrderButtonClick,
}: {
  totalPaymentCost: number;
  label: string;
  buttonText: string;
  handleOrderButtonClick?: () => void;
}) {
  return (
    <PaymentWrapper>
      <PaymentTopContainer>{label}</PaymentTopContainer>
      <PaymentBottomContainer>
        <PaymentBox price={totalPaymentCost}>{label}</PaymentBox>
        <OrderButton
          onClick={handleOrderButtonClick}
          data-testid="order-button"
        >
          {buttonText}
        </OrderButton>
      </PaymentBottomContainer>
    </PaymentWrapper>
  );
}

export default PaymentContainer;
