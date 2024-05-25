import React from 'react';

interface CouponButtonProps {
  onToggleModal: () => void;
}

function CouponButton({ onToggleModal }: CouponButtonProps) {
  return <button onClick={onToggleModal}>쿠폰 적용</button>;
}

export default CouponButton;
