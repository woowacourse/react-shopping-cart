import CheckBox from "../CheckBox/CheckBox";
import { Container, Description, Details, Header } from "./Coupon.styles";
import { CouponType } from "./types";

interface CouponProps {
  coupon: CouponType;
  toggleSelect: (id: number) => void;
  isSelected: boolean;
  isMaxSelected: boolean;
  canRedeem: boolean;
  children?: React.ReactNode;
}

function Coupon({
  coupon,
  toggleSelect,
  isSelected,
  isMaxSelected,
  canRedeem,
  children,
}: CouponProps) {
  const { id, description, expirationDate } = coupon;
  const isDisabled = !canRedeem || (isMaxSelected && !isSelected);

  return (
    <li css={Container(isDisabled)}>
      <div css={Header}>
        <CheckBox
          id={String(id)}
          isSelected={isSelected}
          onClick={() => toggleSelect(id)}
        />
        <p css={Description}>{description}</p>
      </div>
      <div css={Details}>
        <p>
          {`만료일: ${expirationDate.year}년 ${expirationDate.month}월 ${expirationDate.day}일`}
        </p>
        {children}
      </div>
    </li>
  );
}

export default Coupon;
