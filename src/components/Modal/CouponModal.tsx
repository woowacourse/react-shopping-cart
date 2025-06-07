import { css } from '@emotion/react';
import Modal from './Modal';
import { useState } from 'react';

const coupons = [
  {
    id: 'FIXED5000',
    title: '5,000원 할인 쿠폰',
    description: '최소 주문 금액: 100,000원',
    expiry: '2024년 11월 30일',
    disabled: false
  },
  {
    id: 'BOGO',
    title: '2개 구매 시 1개 무료 쿠폰',
    description: '',
    expiry: '2024년 5월 30일',
    disabled: false
  },
  {
    id: 'FREESHIPPING',
    title: '5만원 이상 구매 시 무료 배송 쿠폰',
    description: '최소 주문 금액: 50,000원',
    expiry: '2024년 8월 31일',
    disabled: false
  },
  {
    id: 'MIRACLESALE',
    title: '미라클모닝 30% 할인 쿠폰',
    description: '사용 가능 시간: 오전 4시부터 7시까지',
    expiry: '2024년 7월 31일',
    disabled: false
  }
];

export default function CouponSelectModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedCoupons, setSelectedCoupons] = useState<string[]>([]);

  const toggleCoupon = (id: string) => {
    setSelectedCoupons((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : prev.length < 2 ? [...prev, id] : prev
    );
  };

  const totalDiscount = 6000; // 예시용 정적 값

  return (
    <Modal position="center" size="medium" isOpen={isOpen} onClose={onClose}>
      <Modal.BackDrop />
      <Modal.Content>
        <div css={modalContentStyle}>
          <Modal.Title>쿠폰을 선택해 주세요</Modal.Title>
          <p css={descStyle}>쿠폰은 최대 2개까지 사용할 수 있습니다.</p>
          <ul css={couponListStyle}>
            {coupons.map((coupon) => (
              <li
                key={coupon.id}
                css={[couponItemStyle, selectedCoupons.includes(coupon.id) && selectedStyle]}
                onClick={() => toggleCoupon(coupon.id)}
              >
                <div>
                  <strong>{coupon.title}</strong>
                  <p>{coupon.description}</p>
                  <small>만료일: {coupon.expiry}</small>
                </div>
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

const modalContentStyle = css`
  padding: 24px;
`;

const descStyle = css`
  font-size: 14px;
  color: #666;
  margin: 8px 0 16px;
`;

const couponListStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

const couponItemStyle = css`
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 16px;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.2s ease;
  &:hover {
    border-color: #000;
  }
`;

const selectedStyle = css`
  border-color: #000;
  background: #f4f4f4;
`;

const confirmButtonStyle = css`
  width: 100%;
  background: #000;
  color: #fff;
  font-weight: bold;
  padding: 14px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
`;
