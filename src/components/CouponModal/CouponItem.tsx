import CheckBox from "../CheckBox/CheckBox";
import { Container, CouponText } from "./CouponItem.styles";

export default function CouponItem() {
  return (
    <div css={Container}>
      <CheckBox
        label="5,000원 할인 쿠폰"
        id="5000"
        isSelected={true}
        onClick={() => {}}
        textSize="big"
      />
      <div css={CouponText}>
        <p>만료일: 2024년 11월 30일</p>
        <p>최소 주문 금액: 100,000원</p>
      </div>
    </div>
  );
}
