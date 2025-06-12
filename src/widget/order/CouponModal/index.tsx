import * as S from './CouponModal.styled';
import { useState, useEffect } from 'react';
import { ClientCouponType } from '@entities/coupon';
import Modal from '@shared/ui/Modal';
import CancelIcon from '@assets/icons/cancel.svg';
import CommonButton from '@shared/ui/CommonButton';
import CouponList from '@features/coupon/ui/CouponList';
import { calculateCouponDiscountTotalPrice } from '@entities/coupon';
import { COUPON_RULE } from '@entities/coupon/constants/couponRule';

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientCoupons: ClientCouponType[];
  onConfirm: (selectedCoupons: ClientCouponType[]) => void;
}

export default function CouponModal({
  isOpen,
  onClose,
  clientCoupons,
  onConfirm,
}: CouponModalProps) {
  const [temporaryCoupons, setTemporaryCoupons] = useState<ClientCouponType[]>([]);

  useEffect(() => {
    if (isOpen) {
      setTemporaryCoupons(clientCoupons);
    }
  }, [isOpen, clientCoupons]);

  const validateCouponsCount = (coupons: ClientCouponType[], targetId: number) => {
    const willBeChecked = !coupons.find((coupon) => coupon.coupon.id === targetId)?.checked;
    if (!willBeChecked) return true;

    const checkedCouponsCount = coupons.filter((coupon) => coupon.checked).length;
    if (checkedCouponsCount >= COUPON_RULE.MAX_COUPON_COUNT) {
      alert(`쿠폰은 최대 ${COUPON_RULE.MAX_COUPON_COUNT}개까지만 사용 가능합니다.`);
      return false;
    }
    return true;
  };

  const handleCouponCheck = (couponId: number) => {
    if (!validateCouponsCount(temporaryCoupons, couponId)) return;

    setTemporaryCoupons((prev) =>
      prev.map((coupon) =>
        coupon.coupon.id === couponId ? { ...coupon, checked: !coupon.checked } : coupon,
      ),
    );
  };

  const handleConfirm = () => {
    onConfirm(temporaryCoupons);
    onClose();
  };

  const discountPrice = calculateCouponDiscountTotalPrice(temporaryCoupons);
  const buttonText = `총 ${discountPrice.toLocaleString()}원 할인 쿠폰 사용하기`;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <S.Container>
        <S.Header>
          <S.Title>쿠폰을 선택해 주세요</S.Title>
          <S.CloseButton onClick={onClose}>
            <img src={CancelIcon} alt="close" />
          </S.CloseButton>
        </S.Header>
        <CouponList clientCoupons={temporaryCoupons} onCouponCheck={handleCouponCheck} />
        <CommonButton colorType="black" buttonText={buttonText} onClick={handleConfirm} />
      </S.Container>
    </Modal>
  );
}
