import styled from '@emotion/styled';
import CloseIconButton from './CloseIconButton';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const CouponModal = ({ isOpen, handleClose }: ModalProps) => {
  return (
    isOpen && (
      <S.container data-testid="modal">
        <S.overlay data-testid="modal-overlay" onClick={handleClose} />
        <S.content>
          <CloseIconButton onClick={handleClose} />
          <S.title>쿠폰을 선택해 주세요</S.title>
          <S.closeButton onClick={handleClose}>닫기</S.closeButton>
        </S.content>
      </S.container>
    )
  );
};

export default CouponModal;

const S = {
  container: styled.div`
    position: relative;
    width: 100%;
    z-index: 100;
  `,

  overlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.35);
  `,

  title: styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 24px;
  `,

  content: styled.div`
    background: #fff;
    position: fixed;
    width: 430px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    padding: 24px;
  `,

  closeButton: styled.button`
    width: 100%;
    border-radius: 5px;
    background: #333;
    color: white;
    padding: 8px;
    font-weight: bold;
    border: none;
    transition: 0.3s background;

    &:hover {
      background: #222;
    }
  `,
};
