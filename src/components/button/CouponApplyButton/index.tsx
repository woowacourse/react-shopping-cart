import * as S from "./styled";

interface CouponApplyButtonProps {
  onButtonClick: () => void;
}
const CouponApplyButton = ({ onButtonClick }: CouponApplyButtonProps) => {
  return (
    <S.StyledButton onClick={onButtonClick} $theme="white">
      쿠폰 적용
    </S.StyledButton>
  );
};

export default CouponApplyButton;
