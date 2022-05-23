import { PaymentContainer, PaymentResultContainer, PaymentTitle } from "./styles";

interface PaymentBoxProps {
  title: string;
  subTitle: string;
  amount: string;
  children: React.ReactNode;
}

function PaymentBox({ title, subTitle, amount, children }: PaymentBoxProps) {
  return (
    <PaymentContainer>
      <PaymentTitle>{title}</PaymentTitle>
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
