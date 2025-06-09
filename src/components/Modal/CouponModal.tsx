import * as styles from './CouponModal.styles';
import Modal from './Modal';
import { useState } from 'react';
import { useApiContext } from '../../contexts/ApiContext';
import getCoupons from '../../api/getCoupons';
import { Coupon } from '../../types/response';
import CheckBox from '../common/CheckBox';
import { getLocalStorage } from '../../utils/localStorage';

const CouponModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { data: coupons } = useApiContext({ fetchFn: getCoupons, key: 'getCoupons' });
  const [selectedCoupons, setSelectedCoupons] = useState<Coupon[]>([]);

  const orderAmount = getOrderAmountFromStorage();

  const toggleCoupon = (coupon: Coupon) => {
    setSelectedCoupons((prev) => {
      const exists = prev.find((c) => c.id === coupon.id);
      if (exists) return prev.filter((c) => c.id !== coupon.id);
      return prev.length < 2 ? [...prev, coupon] : prev;
    });
  };

  const isCouponDisabled = (coupon: Coupon) => {
    if (coupon.minimumAmount !== undefined && orderAmount < coupon.minimumAmount) return true;
    if (coupon.availableTime && !isInAvailableTimeRange(coupon.availableTime)) return true;
    if (isExpired(coupon.expirationDate)) return true;
    return false;
  };

  const totalDiscount = calculateTotalDiscount(selectedCoupons, orderAmount);

  return (
    <Modal position="center" size="medium" isOpen={isOpen} onClose={onClose}>
      <Modal.BackDrop css={styles.backdropCss} />
      <Modal.Content>
        <Modal.Title>쿠폰을 선택해 주세요</Modal.Title>
        <p css={styles.descStyle}>쿠폰은 최대 2개까지 사용할 수 있습니다.</p>
        <ul css={styles.couponListStyle}>
          {coupons?.map((coupon) => {
            const isSelected = selectedCoupons.some((c) => c.id === coupon.id);
            const disabled = isCouponDisabled(coupon);
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
          <button css={styles.confirmButtonStyle}>총 {totalDiscount.toLocaleString()}원 할인 쿠폰 사용하기</button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

const getCouponInfo = (coupon: Coupon): string => {
  return [
    `만료일: ${coupon.expirationDate}`,
    coupon.minimumAmount && `최소 주문 금액: ${coupon.minimumAmount.toLocaleString()}원`,
    coupon.availableTime && `사용 가능 시간: ${formatTimeRange(coupon.availableTime.start, coupon.availableTime.end)}`
  ]
    .filter(Boolean)
    .join('\n');
};

const calculateTotalDiscount = (selectedCoupons: Coupon[], orderAmount: number) => {
  const { isRemoteArea } = getShippingInfoFromStorage();
  const baseFee = orderAmount >= 100000 ? 0 : 3000;
  const extraFee = isRemoteArea ? 3000 : 0;
  const originalDeliveryFee = baseFee + extraFee;
  const isFreeShippingCouponApplied = selectedCoupons.find((c) => c.discountType === 'freeShipping');
  const discountedDeliveryFee = isFreeShippingCouponApplied ? 0 : originalDeliveryFee;
  const bogoDiscount = selectedCoupons.find((c) => c.discountType === 'buyXgetY') ? calculateBogoDiscount() : 0;

  return (
    selectedCoupons.reduce((acc, cur) => acc + (cur.discountType === 'fixed' && cur.discount ? cur.discount : 0), 0) +
    (originalDeliveryFee - discountedDeliveryFee) +
    bogoDiscount
  );
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

const getOrderItemsFromStorage = () => {
  return getLocalStorage<{ price: number; quantity: number }[]>('selectedItems', []);
};

const getOrderAmountFromStorage = () => {
  const items = getOrderItemsFromStorage();
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const calculateBogoDiscount = () => {
  const items = getOrderItemsFromStorage();
  const eligibleItems = items.filter((item) => item.quantity >= 2);
  if (eligibleItems.length === 0) return 0;
  const mostExpensiveItem = eligibleItems.reduce((prev, curr) => (curr.price > prev.price ? curr : prev));
  return mostExpensiveItem.price;
};

const getShippingInfoFromStorage = () => {
  const value = getLocalStorage<boolean>('isRemoteArea', false);
  return { isRemoteArea: value === true };
};

const isInAvailableTimeRange = ({ start, end }: { start: string; end: string }) => {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);
  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;
  return nowMinutes >= startMinutes && nowMinutes <= endMinutes;
};

const isExpired = (expirationDate: string) => {
  const now = new Date();
  const expiration = new Date(expirationDate);
  return now > expiration;
};

export default CouponModal;
