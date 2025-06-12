import * as S from "./CouponApplyButton.styles";

interface CouponProps {
  onClick?: () => void;
}

export default function CouponApplyButton({ onClick }: CouponProps) {
  return (
    <section>
      <S.Button onClick={onClick}>쿠폰 적용</S.Button>
    </section>
  );
}
