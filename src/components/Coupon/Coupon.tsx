import { CouponType } from "./types";

interface CouponProps {
  coupon: CouponType;
  children?: React.ReactNode;
}

function Coupon({ coupon, children }: CouponProps) {
  const { description, expirationDate } = coupon;

  return (
    <div>
      <p>{description}</p>
      <p>
        만료일:
        {`${expirationDate.year}년 ${expirationDate.month}월 ${expirationDate.day}일`}
      </p>
      {children}
    </div>
  );
}

export default Coupon;
