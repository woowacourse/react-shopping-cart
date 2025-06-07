import { createPortal } from 'react-dom';

import Text from '../@common/Text/Text';
import CouponCloseButton from './CouponCloseButton';
import CouponSelectDescription from './CouponSelectDescription';
import CouponList from './CouponList';
import CouponListItem from './CouponListItem';
import CouponModalConfirmButton from './CouponModalConfirmButton';

import { Coupon } from '../../types/coupon';
import {
  CouponModalContainerStyle,
  CouponModalContentStyle,
} from './CouponModal.styles';

interface CouponModalProps {
  isOpen: boolean;
  couponList: Coupon[];
  selectedCoupon: Set<string>;
  onClose: () => void;
  onSelectCoupon: (couponId: string) => void;
  onConfirm: () => void;
}

function CouponModal({
  isOpen,
  onClose,
  couponList,
  selectedCoupon,
  onSelectCoupon,
  onConfirm,
}: CouponModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div css={CouponModalContainerStyle}>
      <div css={CouponModalContentStyle}>
        <Text varient="subTitle">쿠폰을 선택해 주세요</Text>
        <CouponCloseButton onClose={onClose} />
        <CouponSelectDescription>
          쿠폰은 최대 2개까지 사용할 수 있습니다.
        </CouponSelectDescription>
        <CouponList>
          {couponList.map((coupon) => (
            <CouponListItem
              key={coupon.id}
              coupon={coupon}
              isSelected={selectedCoupon.has(coupon.id)}
              onSelectCoupon={onSelectCoupon}
            />
          ))}
        </CouponList>
        <CouponModalConfirmButton onConfirm={onConfirm} />
      </div>
    </div>,
    document.body
  );
}

export default CouponModal;
