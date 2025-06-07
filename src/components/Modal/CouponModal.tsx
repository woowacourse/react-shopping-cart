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

  const toggleCoupon = (id: number) => {
    setSelectedCoupons((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : prev.length < 2 ? [...prev, id] : prev
    );
  };

  const formatCouponDescription = (coupon: Coupon) => {
    const desc: string[] = [];

    desc.push(`만료일: ${coupon.expirationDate}`);

    if (coupon.minimumAmount) {
      desc.push(`최소 주문 금액: ${coupon.minimumAmount.toLocaleString()}원`);
    }

    if (coupon.availableTime) {
      desc.push(`사용 가능 시간: ${coupon.availableTime.start} ~ ${coupon.availableTime.end}`);
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
            return (
              <li
                key={coupon.id}
                css={[styles.couponItemStyle, isSelected && styles.selectedStyle]}
                onClick={() => toggleCoupon(coupon.id)}
              >
                <CheckBox
                  checked={isSelected}
                  onChange={() => toggleCoupon(coupon.id)}
                  onClick={(e) => e.stopPropagation()} // 체크박스 클릭 시 li onClick 중복 방지
                  id={`coupon-${coupon.id}`}
                />

                <label
                  htmlFor={`coupon-${coupon.id}`}
                  css={styles.couponLabelStyle}
                  onClick={(e) => {
                    e.stopPropagation(); // label 자체 클릭 시 중복 방지
                    toggleCoupon(coupon.id);
                  }}
                >
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
