import { css } from '@emotion/react';

export default function ApplyCouponButton() {
  const onClickHandler = () => {};

  return (
    <button css={applyCouponButton} onClick={onClickHandler}>
      쿠폰 적용
    </button>
  );
}

const applyCouponButton = css`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 48px;

  background-color: inherit;

  border: 1px solid #33333340;
  border-radius: 5px;

  font-size: 15px;
  font-weight: 700;
  color: #333333bf;

  &:hover {
    opacity: 0.8;
  }
`;
