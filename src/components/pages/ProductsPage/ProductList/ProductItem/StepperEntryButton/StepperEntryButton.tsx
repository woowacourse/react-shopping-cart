import { ButtonHTMLAttributes } from 'react';

import { CART } from '@assets/index';

import Button from '@components/commons/Button/Button';

const StepperEntryButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { onClick } = props;

  return (
    <Button
      height="28px"
      type="button"
      aria-label="장바구니에 상품 추가하기"
      onClick={onClick}
    >
      <CART />
    </Button>
  );
};

export default StepperEntryButton;
