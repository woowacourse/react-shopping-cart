import * as Styled from "./CommonCoupon.style";
import type { BaseCoupon as BaseCouponType } from "../../../../../../type/Coupons";
import CheckBox from "../../../../../common/CheckBox/CheckBox";

interface CommonCouponProps {
  coupon: BaseCouponType;
  isSelected: boolean;
  handleSelectCoupon: (id: number) => void;
}

function CommonCoupon({
  coupon,
  isSelected,
  handleSelectCoupon,
}: CommonCouponProps) {
  const { id, description, expirationDate } = coupon;

  const ExpirationDate = new Date(expirationDate);
  const year = ExpirationDate.getFullYear();
  const month = ExpirationDate.getMonth() + 1;
  const date = ExpirationDate.getDate();

  return (
    <>
      <Styled.Wrapper>
        <CheckBox
          onClick={() => handleSelectCoupon(id)}
          isChecked={isSelected}
        />
        <Styled.Title>{description}</Styled.Title>
      </Styled.Wrapper>
      <Styled.Text>
        만료일: {year}년 {month}월 {date}일
      </Styled.Text>
    </>
  );
}

export default CommonCoupon;
