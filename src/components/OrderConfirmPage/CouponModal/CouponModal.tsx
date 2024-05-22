import { useRecoilState } from 'recoil';
import { Modal } from '@hanuuny/react-modal';
import CouponItem from '../CouponItem/CouponItem';
import useSelectedCoupons from '../../../hooks/useSelectedCoupons';
import useCouponCalculator from '../../../hooks/useCouponCalculator';
import { selectedCouponListState } from '../../../recoil/Coupon/atoms/atoms';
import { Coupon } from '../../../types/Coupon.type';
import { InfoIcon } from '../../../assets';
import * as S from './CouponModal.style';

interface CouponModalProps {
  couponList: Coupon[];
  isOpen: boolean;
  close: () => void;
}

function CouponModal({ couponList, isOpen, close }: CouponModalProps) {
  const [savedCoupons, setSavedCoupons] = useRecoilState(selectedCouponListState);

  const { selectedCoupons, handleSelectedCoupons } = useSelectedCoupons(savedCoupons);
  const { calculateTotalDiscountPrice } = useCouponCalculator();

  const updateSavedCoupons = () => {
    setSavedCoupons(selectedCoupons);
    close();
  };

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
              <CouponItem
                key={coupon.code}
                coupon={coupon}
                isSelected={selectedCoupons.some((selectedCoupon) => selectedCoupon.id === coupon.id)}
                isMaxLength={selectedCoupons.length >= 2}
                handleSelectedCoupons={handleSelectedCoupons}
              />
            ))}
          </S.CouponItemContainer>
        </S.CouponItemList>
      </Modal.Body>
      <Modal.Footer>
        <Modal.Button
          text={`총 ${calculateTotalDiscountPrice(selectedCoupons).toLocaleString()}원 할인 쿠폰 사용하기`}
          onClick={updateSavedCoupons}
        />
      </Modal.Footer>
    </Modal>
  );
}

export default CouponModal;
