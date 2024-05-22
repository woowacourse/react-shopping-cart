import { Modal } from '@hanuuny/react-modal';
import CouponItem from '../CouponItem/CouponItem';
import { useRecoilValue } from 'recoil';
import { Coupon } from '../../../types/Coupon.type';
import { InfoIcon } from '../../../assets';

import * as S from './CouponModal.style';
import { couponDiscountPriceSelector } from '../../../recoil/Coupon/selectors/selectors';

interface CouponModalProps {
  couponList: Coupon[];
  isOpen: boolean;
  close: () => void;
}

function CouponModal({ couponList, isOpen, close }: CouponModalProps) {
  const couponDiscountPrice = useRecoilValue(couponDiscountPriceSelector);

  return (
    <Modal isOpen={isOpen} close={close}>
      <Modal.Header>
        <Modal.Title>쿠폰을 선택해 주세요.</Modal.Title>
        <Modal.CloseButton close={close} />
      </Modal.Header>
      <Modal.Body>
        <S.CouponItemList>
          <S.NotificationContainer>
            <S.InfoIcon src={InfoIcon} />
            <p>쿠폰은 최대 2개까지 사용할 수 있습니다.</p>
          </S.NotificationContainer>
          <S.CouponItemContainer>
            {couponList.map((coupon) => (
              <CouponItem key={coupon.code} coupon={coupon} />
            ))}
          </S.CouponItemContainer>
        </S.CouponItemList>
      </Modal.Body>
      <Modal.Footer>
        <Modal.Button text={`총 ${couponDiscountPrice.toLocaleString()}원 할인 쿠폰 사용하기`} onClick={close} />
      </Modal.Footer>
    </Modal>
  );
}

export default CouponModal;
