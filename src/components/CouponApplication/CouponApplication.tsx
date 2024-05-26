import { Modal } from 'hash-modal';
import { useState } from 'react';
import Coupons from './Coupons';
import * as Styled from './style';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  applyCouponState,
  isShippingFeeDiscountState,
} from '../../recoil/coupons';
import { shippingFeeSelector } from '../../recoil/cartItems';
import useCoupons from '../../hooks/useCoupons';

const CouponApplication = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { getDiscountAmount, ...couponProps } = useCoupons();

  const shippingFee = useRecoilValue(shippingFeeSelector);
  const [shippingFeeDiscount, setShippingFeeDiscount] = useRecoilState(
    isShippingFeeDiscountState,
  );

  const [couponDiscount, updateCouponDiscount] =
    useRecoilState(applyCouponState);

  const modalClose = () => {
    setModalOpen(false);
  };

  const clickConfirm = () => {
    modalClose();
    updateCouponDiscount(getDiscountAmount);
  };

  return (
    <>
      {modalOpen && (
        <Modal modalSize="S" setModalClose={modalClose}>
          <Modal.Header
            setModalClose={modalClose}
            title="쿠폰을 선택해 주세요"
          ></Modal.Header>
          <Modal.Content>
            <Coupons {...couponProps}></Coupons>
          </Modal.Content>
          <Modal.Button
            onClick={clickConfirm}
            buttonSize="MAX"
            content={`총 ${shippingFeeDiscount ? getDiscountAmount + shippingFee : getDiscountAmount}원 할인 쿠폰 사용하기`}
          />
        </Modal>
      )}
      {couponDiscount === 0 ? (
        <Styled.CouponApplyButton onClick={() => setModalOpen(true)}>
          쿠폰 적용
        </Styled.CouponApplyButton>
      ) : (
        <Styled.CouponDeleteButton
          onClick={() => {
            updateCouponDiscount(0);
            setShippingFeeDiscount(false);
          }}
        >
          쿠폰 적용 취소
        </Styled.CouponDeleteButton>
      )}
    </>
  );
};
export default CouponApplication;
