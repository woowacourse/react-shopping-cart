import { PaymentContainer, PaymentResultContainer, PaymentTitleWrapper } from "./styles";

interface PaymentBoxProps {
  title: string;
  subTitle: string;
  amount: string;
  children: React.ReactNode;
}

function PaymentBox({ title, subTitle, amount, children }: PaymentBoxProps) {
  return (
    <PaymentContainer>
      <PaymentTitleWrapper>{title}</PaymentTitleWrapper>
      <PaymentResultContainer>
        <div>
          <span>{subTitle}</span>
          <span>{amount}원</span>
        </div>
        {children}
      </PaymentResultContainer>
    </PaymentContainer>
  );
}

export default PaymentBox;
