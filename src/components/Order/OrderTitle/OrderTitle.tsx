/** @jsxImportSource @emotion/react */
import { useRecoilValue } from "recoil";
import { orderDescriptionStyle, orderTitleStyle } from "./OrderTitle.style";
import { checkedCartItemsSelector } from "../../../store/selector/selectors";

const OrderTitle = () => {
  const checkedCartItems = useRecoilValue(checkedCartItemsSelector);

  const totalAmount = checkedCartItems.reduce((acc: number, cur: CartItemInfo) => {
    return acc + cur.quantity;
  }, 0);

  const orderInfoContent = `총 ${checkedCartItems.length}종류의 상품 ${totalAmount}개를 주문합니다.
  최종 결제 금액을 확인해 주세요.`;

  return (
    <div>
      <h1 css={orderTitleStyle}>주문 확인</h1>
      <div css={orderDescriptionStyle}>{orderInfoContent}</div>
    </div>
  );
};

export default OrderTitle;
