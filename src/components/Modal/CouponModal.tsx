import * as styles from './CouponModal.styles';
import Modal from './Modal';
import { useEffect, useState } from 'react';
import { useApiContext } from '../../contexts/ApiContext';
import getCoupons from '../../api/getCoupons';
import { Coupon } from '../../types/response';
import CheckBox from '../common/CheckBox';
import { getOrderAmountFromStorage } from '../../utils/storage/storage';
import { isCouponDisabled } from '../../utils/coupon/isCouponDisabled';
import { getBestCouponCombination } from '../../utils/coupon/getBestCouponCombination';
import { calculateTotalDiscount } from '../../utils/coupon/calculateTotalDiscount';

const MAX_COUPON_COUNT = 2;

function CouponModal({
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
    setSelectedCoupons((prev) => {
      const exists = prev.find((c) => c.id === coupon.id);
      if (exists) return prev.filter((c) => c.id !== coupon.id);
      return prev.length < MAX_COUPON_COUNT ? [...prev, coupon] : prev;
    });
  };

  const handleButtonClick = () => {
    onClose();
    onApplyDiscount(totalDiscount);
  };

  useEffect(() => {
    if (!coupons) return;
    const bestCombo = getBestCouponCombination(coupons, orderAmount, MAX_COUPON_COUNT);
    setSelectedCoupons(bestCombo);
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
          <button onClick={handleButtonClick} css={styles.confirmButtonStyle}>
            총 {totalDiscount.toLocaleString()}원 할인 쿠폰 사용하기
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

const getCouponInfo = (coupon: Coupon): string => {
  return [
    `만료일: ${coupon.expirationDate}`,
    coupon.minimumAmount && `최소 주문 금액: ${coupon.minimumAmount.toLocaleString()}원`,
    coupon.availableTime && `사용 가능 시간: ${formatTimeRange(coupon.availableTime.start, coupon.availableTime.end)}`
  ]
    .filter(Boolean)
    .join('\n');
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

export default CouponModal;
