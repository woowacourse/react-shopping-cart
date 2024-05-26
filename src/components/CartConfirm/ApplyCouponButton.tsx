import { css } from '@emotion/react';
import { useSetRecoilState } from 'recoil';

import CouponModal from '../Coupon/CouponModal';

import { isCouponModalOpenState } from '@globalState/coupon/atom';

export default function ApplyCouponButton() {
  const setIsCouponModalOpen = useSetRecoilState(isCouponModalOpenState);

  const onClickHandler = () => setIsCouponModalOpen(true);

  return (
    <>
      <button css={applyCouponButton} onClick={onClickHandler}>
        쿠폰 적용
      </button>
      <CouponModal />
    </>
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
