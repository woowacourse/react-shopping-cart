import { Modal, useModal } from 'llqqssttyy-react-modules-components';

import InfoIconSrc from '../../assets/infoIcon.png';
import { priceFormatter } from '../../utils/stringFormatter';

import BorderButton from '../common/BorderButton';
import CouponList from '../common/CouponList';
import * as C from '../common/commonStyles';
import RecoilSuspense from '../common/RecoilSuspense';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { couponListSelector, totalDiscountSelector } from '../../recoil';
import Fallback from '../common/Fallback';
import LoadingSpinner from '../common/LoadingSpinner';

export default function CouponModal() {
  const { isModalOpen, openModal, closeModal } = useModal(false);

  const coupons = useRecoilValueLoadable(couponListSelector);

  const applyCoupon = () => {
    window.alert('변경사항을 저장합니다.');
    closeModal();
  };

  const totalDiscount = useRecoilValue(totalDiscountSelector);

  return (
    <>
      <OpenModalButton openModal={openModal} />

      <RecoilSuspense
        loadable={coupons}
        fallback={
          <Fallback spinner={<LoadingSpinner />} message="로딩 중입니다..." />
        }
      >
        <Modal isModalOpen={isModalOpen} closeModal={applyCoupon}>
          <Modal.Title>쿠폰을 선택해 주세요</Modal.Title>

          <C.Info>
            <C.InfoIcon src={InfoIconSrc} alt="Info Icon" />
            쿠폰은 최대 2개까지 사용할 수 있습니다.
          </C.Info>

          <CouponList coupons={coupons.contents} />

          <Modal.Button
            type="button"
            variant="primary"
            onClick={applyCoupon}
          >{`총 ${priceFormatter(totalDiscount)} 할인 쿠폰 사용하기`}</Modal.Button>
        </Modal>
      </RecoilSuspense>
    </>
  );
}

interface OpenModalButtonProps {
  openModal: () => void;
}

function OpenModalButton({ openModal }: OpenModalButtonProps) {
  return (
    <BorderButton size="full" onClick={openModal}>
      쿠폰 적용
    </BorderButton>
  );
}
