import CheckBox from "@/components/_common/CheckBox/CheckBox";
import * as S from "./Coupon.style";
import TextBox from "@/components/_common/TextBox/TextBox";
import { Coupon } from "@/types/coupon";

const CouponItem = ({ coupon }: { coupon: Coupon }) => {
  return (
    <div>
      <S.FlexBox>
        <CheckBox isChecked={false} onClick={() => {}} />
        <TextBox text={coupon.description} type="xSmall" />
        <TextBox type="xSmall" text={`만료일: ${coupon.expirationDate}`} />
        <TextBox
          type="xSmall"
          text={`최소 주문 금액: ${coupon.minimumAmount}`}
        />
      </S.FlexBox>
    </div>
  );
};

export default CouponItem;
