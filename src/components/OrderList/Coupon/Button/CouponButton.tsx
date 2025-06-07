import * as S from "./CouponButton.styles";

interface CouponProps {
  onClick?: () => void;
}

export default function Coupon({ onClick }: CouponProps) {
  return (
    <section>
      <S.Coupon onClick={onClick}>쿠폰 적용</S.Coupon>
    </section>
  );
}
