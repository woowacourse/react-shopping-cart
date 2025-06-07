import { CheckBox } from "../../../../components/CheckBox/CheckBox";
import { InfoText } from "../../../../components/InfoText/InfoText";
import { CouponType } from "../../types/coupon";
import { checkBoxLayout, couponLayout, infoTextLayout } from "./Coupon.style";

interface CouponProps {
  item: CouponType;
}

export function Coupon({ item }: CouponProps) {
  return (
    <div css={couponLayout}>
      <div css={checkBoxLayout}>
        <CheckBox
          isChecked={false}
          dataTestId={`${item.id}-coupon`}
          id={`${item.id}-coupon`}
          handleCheckBox={() => {}}
        />
        <p>{item.description}</p>
      </div>
      <div css={infoTextLayout}>
        <InfoText>
          만료일: {new Date(item.expirationDate).toLocaleDateString()}
        </InfoText>
        {item.minimumAmount && (
          <InfoText>최소 주문 금액 : {item.minimumAmount} </InfoText>
        )}
        {item.availableTime && (
          <InfoText>
            사용 가능 시간 : {item.availableTime?.start} 부터
            {item.availableTime?.end}까지
          </InfoText>
        )}
      </div>
    </div>
  );
}
