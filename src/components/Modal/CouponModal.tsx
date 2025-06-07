import { css } from '@emotion/react';
import Modal from './Modal';
import { useState } from 'react';
import { useApiContext } from '../../contexts/ApiContext';
import getCoupons from '../../api/getCoupons';
type TimeRange = {
  start: string;
  end: string;
};

export type Coupon = {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: 'FIXED' | 'BOGO' | 'FREESHIPPING' | 'TIMED';
  discount?: number;
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: TimeRange;
};
export default function CouponModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { data: coupons } = useApiContext<Coupon[]>({ fetchFn: getCoupons, key: 'getCoupons' });
  const [selectedCoupons, setSelectedCoupons] = useState<number[]>([]);

  const toggleCoupon = (id: number) => {
    setSelectedCoupons((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : prev.length < 2 ? [...prev, id] : prev
    );
  };

  const formatCouponDescription = (coupon: Coupon) => {
    const desc: string[] = [];
    if (coupon.minimumAmount) {
      desc.push(`최소 주문 금액: ${coupon.minimumAmount.toLocaleString()}원`);
    }
    if (coupon.availableTime) {
      desc.push(`사용 가능 시간: ${coupon.availableTime.start} ~ ${coupon.availableTime.end}`);
    }
    return desc.join(', ');
  };

  const totalDiscount = 6000;

  return (
    <Modal position="center" size="medium" isOpen={isOpen} onClose={onClose}>
      <Modal.BackDrop css={backdropCss} />
      <Modal.Content>
        <div>
          <Modal.Title>쿠폰을 선택해 주세요</Modal.Title>
          <p css={descStyle}>쿠폰은 최대 2개까지 사용할 수 있습니다.</p>
          <ul css={couponListStyle}>
            {coupons?.map((coupon) => (
              <li
                key={coupon.id}
                css={[couponItemStyle, selectedCoupons.includes(coupon.id) && selectedStyle]}
                onClick={() => toggleCoupon(coupon.id)}
              >
                <p>{coupon.description || formatCouponDescription(coupon)}</p>
                <small>만료일: {coupon.expirationDate}</small>
                {coupon.minimumAmount && <small>최소 주문 금액: {coupon.minimumAmount}</small>}
              </li>
            ))}
          </ul>
          <Modal.Footer>
            <button css={confirmButtonStyle}>총 {totalDiscount.toLocaleString()}원 할인 쿠폰 사용하기</button>
          </Modal.Footer>
        </div>
      </Modal.Content>
    </Modal>
  );
}
const backdropCss = css({
  backgroundColor: 'rgba(0, 0, 0, 0.35)'
});

const descStyle = css({
  fontSize: '14px',
  color: '#666',
  margin: '8px 0 16px'
});

const couponListStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginBottom: '24px'
});

const couponItemStyle = css({
  border: '1px solid #ccc',
  borderRadius: '12px',
  padding: '16px',
  background: '#fff',
  cursor: 'pointer',
  transition: 'border-color 0.2s ease',
  '&:hover': {
    borderColor: '#000'
  }
});

const selectedStyle = css({
  borderColor: '#000',
  background: '#f4f4f4'
});

const confirmButtonStyle = css({
  width: '100%',
  background: '#000',
  color: '#fff',
  fontWeight: 'bold',
  padding: '14px',
  borderRadius: '10px',
  fontSize: '16px',
  cursor: 'pointer'
});
