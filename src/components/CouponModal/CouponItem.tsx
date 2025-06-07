import CheckBox from "../CheckBox/CheckBox";
import * as S from "./CouponItem.styled";

export default function CouponItem() {
  return (
    <S.Container>
      <CheckBox text="5,000원 할인 쿠폰" isChecked={true} onChange={() => {}} />
      <S.CouponText>
        <p>만료일: 2024년 11월 30일</p>
        <p>최소 주문 금액: 100,000원</p>
      </S.CouponText>
    </S.Container>
  );
}
