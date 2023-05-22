import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import * as S from './Modal.styles';

interface ModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
  onDeleteSelectedItems: () => void;
}

const Modal = (props: PropsWithChildren<ModalProps>) => {
  const { isOpen, onCloseModal, onDeleteSelectedItems } = props;
  return createPortal(
    isOpen && (
      <>
        <S.BackDrop onClick={onCloseModal} />
        <S.Wrapper>
          <S.AlertTitle>선택한 상품들을 삭제하시겠습니까?</S.AlertTitle>
          <S.ButtonWrapper>
            <S.Button onClick={onDeleteSelectedItems}>네</S.Button>
            <S.Button onClick={onCloseModal}>아니오</S.Button>
          </S.ButtonWrapper>
        </S.Wrapper>
      </>
    ),
    document.body
  );
};

export default Modal;
