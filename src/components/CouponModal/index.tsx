import { Modal, useModal } from 'llqqssttyy-react-modules-components';
import BorderButton from '../common/BorderButton';

import InfoIconSrc from '../../assets/infoIcon.png';
import { priceFormatter } from '../../utils/stringFormatter';
import CouponList from '../common/CouponList';
import * as C from '../commonStyles';

export default function CouponModal() {
  const { isModalOpen, openModal, closeModal } = useModal(false);

  const applyCoupon = () => {
    const confirm = window.confirm('쿠폰을 적용하시겠습니까?');
    if (confirm) closeModal();
  };

  return (
    <>
      <OpenModalButton openModal={openModal} />

      <Modal isModalOpen={isModalOpen} closeModal={closeModal}>
        <Modal.Title>쿠폰을 선택해 주세요</Modal.Title>

        <C.Info>
          <C.InfoIcon src={InfoIconSrc} alt="Info Icon" />
          쿠폰은 최대 2개까지 사용할 수 있습니다.
        </C.Info>

        <CouponList />

        <Modal.Button
          type="button"
          variant="primary"
          onClick={applyCoupon}
        >{`총 ${priceFormatter(0)} 할인 쿠폰 사용하기`}</Modal.Button>
      </Modal>
    </>
  );
}

// TODO: 분리?
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
