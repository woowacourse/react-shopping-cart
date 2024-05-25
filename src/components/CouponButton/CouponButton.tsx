import React from 'react';
import * as S from './CouponButton.styled';

interface CouponButtonProps {
  onToggleModal: () => void;
}

function CouponButton({ onToggleModal }: CouponButtonProps) {
  return <S.CouponButton onClick={onToggleModal}>쿠폰 적용</S.CouponButton>;
}

export default CouponButton;
