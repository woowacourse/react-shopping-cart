import { Modal } from 'cookie-nice-modal';
import { useReducer } from 'react';
import * as S from './styled';
import { mockCoupons } from './../../mocks/coupons';
import EachCoupon from './EachCoupon/EachCoupon';

const Coupon = () => {
  const [couponModalOpen, toggleCouponModalOpen] = useReducer(prev => !prev, false);
  const coupons = mockCoupons;

  return (
    <>
      <S.ApplyCouponButton onClick={toggleCouponModalOpen}>쿠폰 적용</S.ApplyCouponButton>
      <Modal type="dialog" open={couponModalOpen} onClose={toggleCouponModalOpen}>
        <Modal.Header title="쿠폰을 선택해 주세요" onClose={toggleCouponModalOpen} />
        <Modal.Content>
          {coupons.map(coupon => (
            <EachCoupon key={coupon.id} coupon={coupon} />
          ))}
        </Modal.Content>
        <Modal.Footer
          closeButton={{ role: 'close', hide: true }}
          confirmButton={{
            customButton: <S.ConfirmButton>총 6,000원 할인 쿠폰 사용하기</S.ConfirmButton>,
            role: 'confirm',
          }}
        />
      </Modal>
    </>
  );
};

export default Coupon;
