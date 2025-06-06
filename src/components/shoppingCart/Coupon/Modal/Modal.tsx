import Close from "../../../../assets/Close.png";
import * as S from "./Modal.styles";

interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isModalOpen, onClose }: ModalProps) {
  if (!isModalOpen) {
    return null;
  }

  return (
    <>
      <S.ModalBackground isModalOpen={isModalOpen}>
        <S.ModalContainer>
          <S.ModalHeader>
            <S.ModalHeaderTitle>
              <p>쿠폰을 선택해 주세요</p>
            </S.ModalHeaderTitle>
            <S.ModalHeaderCloseImg src={Close} onClick={onClose} />
          </S.ModalHeader>
        </S.ModalContainer>
      </S.ModalBackground>
    </>
  );
}
