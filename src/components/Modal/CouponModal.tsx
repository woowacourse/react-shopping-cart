import * as styles from './CouponModal.styles';
import Modal from './Modal';
import { useState } from 'react';
import { useApiContext } from '../../contexts/ApiContext';
import getCoupons from '../../api/getCoupons';
import { Coupon } from '../../types/response';
import CheckBox from '../common/CheckBox';

export default function CouponModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { data: coupons } = useApiContext({ fetchFn: getCoupons, key: 'getCoupons' });
  const [selectedCoupons, setSelectedCoupons] = useState<number[]>([]);

  const orderAmount = getOrderAmountFromStorage();

  const toggleCoupon = (id: number) => {
    setSelectedCoupons((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : prev.length < 2 ? [...prev, id] : prev
    );
  };

  const isCouponDisabled = (coupon: Coupon) => {
    return coupon.minimumAmount !== undefined && orderAmount < coupon.minimumAmount;
  };

  const formatCouponDescription = (coupon: Coupon) => {
    const desc: string[] = [];

    desc.push(`만료일: ${coupon.expirationDate}`);

    if (coupon.minimumAmount) {
      desc.push(`최소 주문 금액: ${coupon.minimumAmount.toLocaleString()}원`);
    }

    if (coupon.availableTime) {
      desc.push(`사용 가능 시간 ${formatTimeRange(coupon.availableTime.start, coupon.availableTime.end)}`);
    }

    return desc.join('\n');
  };

  const totalDiscount =
    coupons
      ?.filter((c) => selectedCoupons.includes(c.id))
      .reduce((acc, cur) => acc + (cur.discountType === 'fixed' && cur.discount ? cur.discount : 0), 0) ?? 0;

  return (
    <Modal position="center" size="medium" isOpen={isOpen} onClose={onClose}>
      <Modal.BackDrop css={styles.backdropCss} />
      <Modal.Content>
        <Modal.Title>쿠폰을 선택해 주세요</Modal.Title>
        <p css={styles.descStyle}>쿠폰은 최대 2개까지 사용할 수 있습니다.</p>

        <ul css={styles.couponListStyle}>
          {coupons?.map((coupon) => {
            const isSelected = selectedCoupons.includes(coupon.id);
            const disabled = isCouponDisabled(coupon);

            return (
              <li
                key={coupon.id}
                css={[styles.couponItemStyle, isSelected && styles.selectedStyle, disabled && styles.disabledStyle]}
                onClick={() => !disabled && toggleCoupon(coupon.id)}
              >
                <CheckBox
                  checked={isSelected}
                  onChange={() => toggleCoupon(coupon.id)}
                  onClick={(e) => e.stopPropagation()}
                  disabled={disabled}
                  id={`coupon-${coupon.id}`}
                />
                <label htmlFor={`coupon-${coupon.id}`} css={styles.couponLabelStyle}>
                  <p>{coupon.description}</p>
                  <small>{formatCouponDescription(coupon)}</small>
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
}

function formatTimeRange(start: string, end: string): string {
  const format = (time: string) => {
    const [hourStr] = time.split(':');
    const hour = parseInt(hourStr, 10);
    const period = hour < 12 ? '오전' : '오후';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${period} ${displayHour}시`;
  };

  return `${format(start)}부터 ${format(end)}까지`;
}

function getOrderAmountFromStorage(): number {
  try {
    const data = localStorage.getItem('selectedItems');
    if (!data) return 0;
    const items = JSON.parse(data) as { price: number }[];
    return items.reduce((sum, item) => sum + item.price, 0);
  } catch {
    return 0;
  }
}
