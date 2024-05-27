import { Modal } from 'nakta-react-payments-components';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import CouponList from './CouponList';
import InformationText from '../common/InformationText';

import { MAX_SELECTED_COUPON_LENGTH } from '@/constants/coupon';
import {
  fixedSelectedCouponsState,
  isCouponModalOpenState,
  selectedCouponsState,
} from '@globalState/coupon/atom';
import { calculateTotalDiscountAmountSelector } from '@globalState/coupon/selector';

export default function CouponModal() {
  const [isCouponModalOpen, setIsCouponModalOpen] = useRecoilState(isCouponModalOpenState);
  const [selectedCoupons, setSelectedCoupons] = useRecoilState(selectedCouponsState);
  const [fixedSelectedCoupons, setFixedSelectedCoupons] = useRecoilState(fixedSelectedCouponsState);
  const totalDiscountAmount = useRecoilValue(calculateTotalDiscountAmountSelector(false));

  const onClose = () => {
    setSelectedCoupons([]);
    setIsCouponModalOpen(false);
  };

  const onApplyCouponButtonClick = () => {
    onClose();
    setFixedSelectedCoupons(selectedCoupons);
  };

  useEffect(() => {
    if (!isCouponModalOpen) {
      setSelectedCoupons(fixedSelectedCoupons);
    }
  }, [isCouponModalOpen]);

  return (
    <Modal position="center" isOpen={isCouponModalOpen} onClose={onClose}>
      <Modal.Backdrop onClick={onClose} />
      <Modal.Content size={382}>
        <Modal.Header>
          <Modal.Title>쿠폰을 선택해주세요</Modal.Title>
          <Modal.CloseButton onClick={onClose} />
        </Modal.Header>
        <Modal.Main>
          <Modal.Label color="basic">
            <InformationText>
              쿠폰은 최대 {MAX_SELECTED_COUPON_LENGTH}개까지 사용할 수 있습니다.
            </InformationText>
          </Modal.Label>
          <CouponList />
        </Modal.Main>
        <Modal.Footer align="row" position="right">
          <Modal.Button backgroundColor="primary" onClick={onApplyCouponButtonClick} size="full">
            총 {totalDiscountAmount.toLocaleString('ko-KR')}원 할인 쿠폰 사용하기
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
