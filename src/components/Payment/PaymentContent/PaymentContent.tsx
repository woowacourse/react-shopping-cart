/** @jsxImportSource @emotion/react */
import { useRecoilValue } from "recoil";
import { checkedCartItemsSelector } from "../../../store/selector/selectors";
import { PaymentContentStyle, PaymentTitleStyle, OrderDescriptionStyle } from "./PaymentContent.style";
import PaymentDetail from "../../common/PaymentDetail/PaymentDetail";
import { useCartCalculator } from "../../../hooks/useCartCalculator";

const PaymentContent = () => {
  const checkedCartItems = useRecoilValue(checkedCartItemsSelector);

  const { calculateTotalWithCoupon } = useCartCalculator();

  const totalAmount = checkedCartItems.reduce((acc: number, cur: CartItemInfo) => {
    return acc + cur.quantity;
  }, 0);

  const orderInfoContent = `총 ${checkedCartItems.length}종류의 상품 ${totalAmount}개를 주문했습니다.
  최종 결제 금액을 확인해 주세요.`;

  return (
    <main css={PaymentContentStyle}>
      <h1 css={PaymentTitleStyle}>결제 확인</h1>
      <div css={OrderDescriptionStyle}>{orderInfoContent}</div>
      <PaymentDetail title="총 결제 금액" amount={calculateTotalWithCoupon()} directionStyle="column" />
    </main>
  );
};

export default PaymentContent;
