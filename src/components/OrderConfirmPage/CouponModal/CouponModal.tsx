import { useRecoilState } from 'recoil';
import { Modal } from '@hanuuny/react-modal';
import CouponItem from '../CouponItem/CouponItem';
import NotificationLabel from '../../common/NotificationLabel/NotificationLabel';
import useSelectedCoupons from '../../../hooks/useSelectedCoupons';
import { selectedCouponListState } from '../../../recoil/Coupon/atoms/atoms';
import { Coupon } from '../../../types/Coupon.type';
import * as S from './CouponModal.style';

interface CouponModalProps {
  couponList: Coupon[];
  isOpen: boolean;
  close: () => void;
}

function CouponModal({ couponList, isOpen, close }: CouponModalProps) {
  const [savedCouponList, setSavedCouponList] = useRecoilState(selectedCouponListState);

  const { selectedCoupons, totalDiscountPrice, handleSelectedCoupons } = useSelectedCoupons(savedCouponList);

  const updateSavedCoupons = () => {
    setSavedCouponList(selectedCoupons);
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
          <NotificationLabel text="쿠폰은 최대 2개까지 사용할 수 있습니다." />
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
          text={
            selectedCoupons.length >= 1
              ? `총 ${totalDiscountPrice.toLocaleString()}원 할인 쿠폰 사용하기`
              : '쿠폰 등록 취소하기'
          }
          onClick={updateSavedCoupons}
        />
      </Modal.Footer>
    </Modal>
  );
}

export default CouponModal;
