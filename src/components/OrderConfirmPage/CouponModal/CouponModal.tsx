import { Modal } from '@hanuuny/react-modal';
import CouponItem from '../CouponItem/CouponItem';
import { useRecoilState } from 'recoil';
import useCartCalculator from '../../../hooks/useCartCalculator';
import { Coupon } from '../../../types/Coupon.type';
import { InfoIcon } from '../../../assets';

import * as S from './CouponModal.style';
import { selectedCouponListState } from '../../../recoil/Coupon/atoms/atoms';
import { useState } from 'react';

interface CouponModalProps {
  couponList: Coupon[];
  isOpen: boolean;
  close: () => void;
}

function CouponModal({ couponList, isOpen, close }: CouponModalProps) {
  const [savedSelectedCoupons, setSavedSelectedCoupons] = useRecoilState(selectedCouponListState);
  const [selectedCoupons, setSelectedCoupons] = useState(savedSelectedCoupons);

  const { calculateTotalDiscoutPrice } = useCartCalculator();

  const handleSelectedCoupons = (newCoupon: Coupon) => {
    const isSelected = selectedCoupons.some((coupon) => coupon.id === newCoupon.id);

    const newSelectedCoupons = isSelected
      ? selectedCoupons.filter((coupon) => coupon.id !== newCoupon.id)
      : [...selectedCoupons, newCoupon];

    setSelectedCoupons(newSelectedCoupons);
  };

  const handleModalButtonClick = () => {
    setSavedSelectedCoupons(selectedCoupons);
    close();
  };

  return (
    <Modal isOpen={isOpen} close={close}>
      <Modal.Header>
        <Modal.Title>쿠폰을 선택해 주세요.</Modal.Title>
        <Modal.CloseButton close={close} />
      </Modal.Header>
      <Modal.Body>
        <S.CouponItemList>
          <S.NotificationContainer>
            <S.InfoIcon src={InfoIcon} />
            <p>쿠폰은 최대 2개까지 사용할 수 있습니다.</p>
          </S.NotificationContainer>
          <S.CouponItemContainer>
            {couponList.map((coupon) => (
              <CouponItem
                key={coupon.code}
                coupon={coupon}
                isSelected={selectedCoupons.some((selectedCoupon) => selectedCoupon.id === coupon.id)}
                isMaxLength={selectedCoupons.length >= 2}
                handleSelectedCoupons={handleSelectedCoupons}
              />
            ))}
          </S.CouponItemContainer>
        </S.CouponItemList>
      </Modal.Body>
      <Modal.Footer>
        <Modal.Button
          text={`총 ${calculateTotalDiscoutPrice(selectedCoupons).toLocaleString()}원 할인 쿠폰 사용하기`}
          onClick={handleModalButtonClick}
        />
      </Modal.Footer>
    </Modal>
  );
}

export default CouponModal;
