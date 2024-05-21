import CheckBox from "@/components/_common/CheckBox/CheckBox";
import * as S from "./Coupon.style";
import TextBox from "@/components/_common/TextBox/TextBox";
import { Coupon } from "@/types/coupon";

const CouponItem = ({ coupon }: { coupon: Coupon }) => {
  return (
    <S.Wrapper>
      <S.BorderLine />
      <S.FlexBox>
        <CheckBox isChecked={false} onClick={() => {}} />
        <TextBox text={coupon.description} type="small" />
      </S.FlexBox>
      <TextBox
        type="xSmall"
        text={`만료일: ${coupon.expirationDate}`}
        style={{ paddingTop: "3px" }}
      />
      <TextBox type="xSmall" text={`최소 주문 금액: ${coupon.minimumAmount}`} />
    </S.Wrapper>
  );
};

export default CouponItem;
