import {
  ExpectedPaymentText,
  ExpectedPaymentWrapper,
} from "./ExpectedPaymentBox.style";

const ExpectedPaymentBox = ({ price }: { price: number }) => {
  return (
    <ExpectedPaymentWrapper>
      <ExpectedPaymentText>결제 예상 금액</ExpectedPaymentText>
      <ExpectedPaymentText>{price}원</ExpectedPaymentText>
    </ExpectedPaymentWrapper>
  );
};

export default ExpectedPaymentBox;
