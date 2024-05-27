import { Modal } from 'maru-nice-modal';
import { useSetRecoilState } from 'recoil';

import { confirmButton, contentWrapper, couponListWrapper } from './CouponModal.styled';
import CouponItem from '../CouponItem/CouponItem';
import { isCheckedCoupon } from '../utils/isCheckedCoupon';

import GuideText from '@/components/common/GuideText/GuideText';
import { couponChecklistState } from '@/recoil/coupons/atoms';
import { Coupon } from '@/types/coupon';

import useCoupon from '@hooks/useCoupon';

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  couponList: Coupon[];
}

const CouponModal = ({ isOpen, onClose, couponList }: CouponModalProps) => {
  const setCouponCheckList = useSetRecoilState(couponChecklistState);
  const { localDiscountPrice, localCouponChecklist, handleChangeChecked, isValidCoupon } =
    useCoupon(couponList);

  const handleClickApplyCoupon = () => {
    setCouponCheckList(localCouponChecklist);
    onClose();
  };

  const convertDiscountLabel = () => {
    const isFreeShipping = isCheckedCoupon(localCouponChecklist, 'FREESHIPPING');
    const displayDiscountLabel = `총 ${localDiscountPrice.toLocaleString('ko-KR')}원 할인 쿠폰 사용하기`;

    return isFreeShipping ? `${displayDiscountLabel} + 무료 배송` : `${displayDiscountLabel}`;
  };

  return (
    <Modal isOpen={isOpen}>
      <Modal.Dimmed onDimmedClick={onClose} />
      <Modal.Header>
        <Modal.Title title="쿠폰을 선택해주세요" />
        <Modal.CloseIcon onClose={onClose} />
      </Modal.Header>
      <Modal.Content css={contentWrapper}>
        <GuideText label="쿠폰은 최대 2개까지 사용할 수 있습니다." />
        <div css={couponListWrapper}>
          {localCouponChecklist.map((coupon) => (
            <CouponItem
              key={coupon.code}
              coupon={coupon}
              isValid={isValidCoupon(coupon)}
              handleChangeChecked={(e) => handleChangeChecked(e, coupon)}
            />
          ))}
        </div>
      </Modal.Content>
      <Modal.ConfirmButton
        css={confirmButton}
        label={convertDiscountLabel()}
        onConfirm={handleClickApplyCoupon}
      />
    </Modal>
  );
};

export default CouponModal;
