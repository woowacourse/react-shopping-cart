import * as Styled from "./CommonCoupon.style";
import { BaseCoupon } from "../../../../../../type/Coupons";
import CheckBox from "../../../../../common/CheckBox/CheckBox";

interface CommonCouponProps {
  coupon: BaseCoupon; // BaseCoupon 타입을 받도록 함
  isSelected: boolean; // 쿠폰 선택 여부
  handleSelectCoupon: (id: number) => void; // 쿠폰 선택 핸들러
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
