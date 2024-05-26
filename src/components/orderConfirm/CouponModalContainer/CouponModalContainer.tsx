import { availableCouponsAtom } from '@recoil/shoppingCart';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import CouponModal from '../CouponModal/CouponModal';
import CouponModalButton from '../CouponModalButton/CouponModalButton';

const CouponModalContainer = () => {
  const [openModal, setOpenModal] = useState(false);
  const availableCoupons = useRecoilValue(availableCouponsAtom);
  const handleClickModalButton = () => {
    setOpenModal(true);
  };
  return (
    <>
      <CouponModalButton disabled={availableCoupons.length === 0} onClick={handleClickModalButton}>
        쿠폰 적용
      </CouponModalButton>
      <CouponModal openModal={openModal} setOpenModal={setOpenModal} availableCoupons={availableCoupons} />
    </>
  );
};

export default CouponModalContainer;
