import CheckBox from "@/components/_common/CheckBox/CheckBox";
import * as S from "./Coupon.style";
import TextBox from "@/components/_common/TextBox/TextBox";

const Coupon = () => {
  return (
    <div>
      <S.FlexBox>
        <CheckBox isChecked={false} onClick={() => {}} />
        <TextBox text="5000원 할인 쿠폰" type="caption" />
        <TextBox type="caption" text="만료일: 2024년 11월 30일" />
        <TextBox type="caption" text="최소 주문 금액: 100,000원" />
      </S.FlexBox>
    </div>
  );
};

export default Coupon;
