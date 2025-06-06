import { Container, Description, Details } from "./Coupon.styles";
import { CouponType } from "./types";

interface CouponProps {
  coupon: CouponType;
  children?: React.ReactNode;
}

function Coupon({ coupon, children }: CouponProps) {
  const { description, expirationDate } = coupon;

  return (
    <div css={Container}>
      <h3 css={Description}>{description}</h3>
      <div css={Details}>
        <p>
          {`만료일: ${expirationDate.year}년 ${expirationDate.month}월 ${expirationDate.day}일`}
        </p>
        {children}
      </div>
    </div>
  );
}

export default Coupon;
