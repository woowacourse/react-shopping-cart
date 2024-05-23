import * as S from '../CouponModal/style';

import COUPONS from '../../../constants/coupons';
import CouponItem from '../CouponItem/CouponItem';
import { InfoIcon } from '../../../assets';
import { Modal } from 'le-sserafim';
import convertToLocaleAmount from '../../../utils/convertToLocalePrice';

interface CouponModalProps {
  onClose: () => void;
  onConfirm: () => void;
}
export default function CouponModal({ onClose, onConfirm }: CouponModalProps) {
  const couponAmount = convertToLocaleAmount(6000);
  return (
    <Modal
      onClose={onClose}
      onConfirm={onConfirm}
      buttonText={`총 ${couponAmount} 할인 쿠폰 사용하기`}
      title="쿠폰을 선택해 주세요"
      size={'free'}
    >
      <S.ContentContainer>
        <S.InfoBox>
          <img src={InfoIcon} /> {'쿠폰은 최대 2개까지 사용할 수 있습니다.'}
        </S.InfoBox>
        <S.CouponItemContainer>
          {COUPONS.map((coupon) => {
            return <CouponItem key={coupon.id} isChecked coupon={coupon} isAvailable />;
          })}
        </S.CouponItemContainer>
      </S.ContentContainer>
    </Modal>
  );
}
