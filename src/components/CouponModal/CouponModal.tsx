import { COUPON } from '../../constants/constants';
import info from '../../assets/info.svg';
import close from '../../assets/close.svg';
import CouponList from './CouponList/CouponList';
import { Modal } from 'ollie-modal-components';

import { useRecoilState } from 'recoil';
import { modalDiscountState, orderDiscountState } from './../../recoil/atoms';
import * as S from './styled';

export interface CouponModalProps {
  isOpen: boolean;
  toggleModal: () => void;
}

const CouponModal = ({ isOpen, toggleModal }: CouponModalProps) => {
  const [modalDiscountAmount, setModalDiscountAmount] = useRecoilState(modalDiscountState);
  const [orderDiscountAmount, setOrderDiscountAmount] = useRecoilState(orderDiscountState);

  const onClickModalButton = () => {
    setOrderDiscountAmount(modalDiscountAmount);
    toggleModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={toggleModal} style={{ borderRadius: '8px' }}>
      <Modal.ModalHeader style={{ margin: '3.2rem' }}>
        <Modal.ModalTitle
          style={{
            fontFamily: 'Noto Sans KR',
            fontWeight: 700,
            lineHeight: '2.606rem',
            fontSize: '1.8rem',
          }}
        >
          쿠폰을 선택해 주세요
        </Modal.ModalTitle>
        <Modal.ModalCloseButton onClick={toggleModal} style={{ cursor: 'pointer' }}>
          <img src={close} alt="" />
        </Modal.ModalCloseButton>
      </Modal.ModalHeader>
      <Modal.ModalContent style={{ margin: '3.2rem' }}>
        <S.Info>
          <img src={info} alt="" />
          <S.InfoText>{`쿠폰은 최대 ${COUPON.MAX_APPLICABLE_COUNT}개까지 사용할 수 있습니다.`}</S.InfoText>
        </S.Info>
        <CouponList></CouponList>
      </Modal.ModalContent>

      <Modal.ModalFooter align={'center'} style={{ margin: '0' }}>
        <Modal.ModalButton
          size={'L'}
          onClick={onClickModalButton}
          style={{
            borderRadius: '5px',
            width: '35rem',
            margin: '0 3.2rem 2.4rem 3.2rem',
            padding: '1.1rem 6.2rem',
            cursor: 'pointer',
          }}
        >
          {`총 ${modalDiscountAmount.toLocaleString()}원 할인 쿠폰 사용하기`}
        </Modal.ModalButton>
      </Modal.ModalFooter>
    </Modal>
  );
};

export default CouponModal;
