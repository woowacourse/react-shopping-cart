import * as styles from './CouponModal.styles';
import Modal from './Modal';
import { useEffect, useState } from 'react';
import { useApiContext } from '../../contexts/ApiContext';
import getCoupons from '../../api/getCoupons';
import { Coupon } from '../../types/response';
import CheckBox from '../common/CheckBox';
import { getOrderAmountFromStorage } from '../../utils/storage/storage';
import { isCouponDisabled } from '../../domain/coupon/isCouponDisabled';

import { calculateTotalDiscount } from '../../domain/coupon/calculateTotalDiscount';
import { getBestCouponCombination } from '../../domain/coupon/getBestCouponCombination';

const MAX_COUPON_COUNT = 2;

export default function CouponModal({
  isOpen,
  onClose,
  onApplyDiscount
}: {
  isOpen: boolean;
  onClose: () => void;
  onApplyDiscount: (discount: number) => void;
}) {
  const { data: coupons } = useApiContext({ fetchFn: getCoupons, key: 'getCoupons' });
  const [selectedCoupons, setSelectedCoupons] = useState<Coupon[]>([]);

  const orderAmount = getOrderAmountFromStorage();
  const totalDiscount = calculateTotalDiscount(selectedCoupons, orderAmount);

  const toggleCoupon = (coupon: Coupon) => {
    setSelectedCoupons((prev) => toggleCouponSelection(prev, coupon));
  };

  const handleButtonClick = () => {
    if (totalDiscount === 0) return;
    onApplyDiscount(totalDiscount);
    onClose();
  };

  useEffect(() => {
    if (!coupons) return;
    const { bestCoupons } = getBestCouponCombination(coupons, orderAmount, MAX_COUPON_COUNT);
    setSelectedCoupons(bestCoupons);
  }, [coupons, orderAmount]);

  return (
    <Modal position="center" size="medium" isOpen={isOpen} onClose={onClose}>
      <Modal.BackDrop css={styles.backdropCss} />
      <Modal.Content>
        <Modal.Title>쿠폰을 선택해 주세요</Modal.Title>
        <p css={styles.descStyle}>쿠폰은 최대 {MAX_COUPON_COUNT}개까지 사용할 수 있습니다.</p>
        <ul css={styles.couponListStyle}>
          {coupons?.map((coupon) => {
            const isSelected = selectedCoupons.some((c) => c.id === coupon.id);
            const disabled = isCouponDisabled(coupon, orderAmount);

            return (
              <li
                key={coupon.id}
                css={[styles.couponItemStyle, isSelected && styles.selectedStyle, disabled && styles.disabledStyle]}
                onClick={() => !disabled && toggleCoupon(coupon)}
              >
                <CheckBox
                  checked={isSelected}
                  onChange={() => toggleCoupon(coupon)}
                  onClick={(e) => e.stopPropagation()}
                  disabled={disabled}
                  id={`coupon-${coupon.id}`}
                />
                <label htmlFor={`coupon-${coupon.id}`} css={styles.couponLabelStyle}>
                  <p>{coupon.description}</p>
                  <small css={styles.preLineStyle}>{getCouponInfo(coupon)}</small>
                </label>
              </li>
            );
          })}
        </ul>
        <Modal.Footer>
          <button onClick={handleButtonClick} disabled={totalDiscount === 0} css={styles.confirmButtonStyle}>
            총 {totalDiscount.toLocaleString()}원 할인 쿠폰 사용하기
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

const toggleCouponSelection = (prev: Coupon[], coupon: Coupon): Coupon[] => {
  const exists = prev.some((c) => c.id === coupon.id);
  if (exists) return prev.filter((c) => c.id !== coupon.id);
  return prev.length < MAX_COUPON_COUNT ? [...prev, coupon] : prev;
};

const getCouponInfo = (coupon: Coupon): string => {
  const { expirationDate, minimumAmount, availableTime } = coupon;

  const parts = [
    `만료일: ${expirationDate}`,
    minimumAmount && `최소 주문 금액: ${minimumAmount.toLocaleString()}원`,
    availableTime && `사용 가능 시간: ${formatTimeRange(availableTime.start, availableTime.end)}`
  ];

  return parts.filter(Boolean).join('\n');
};

const formatTimeRange = (start: string, end: string): string => {
  const format = (time: string) => {
    const [hourStr] = time.split(':');
    const hour = parseInt(hourStr, 10);
    const period = hour < 12 ? '오전' : '오후';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${period} ${displayHour}시`;
  };
  return `${format(start)}부터 ${format(end)}까지`;
};
