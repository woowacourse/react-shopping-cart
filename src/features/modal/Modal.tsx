import { PropsWithChildren } from "react";
import Portal from "../../components/@common/Portal/Portal";
import * as S from "./Modal.styles";

type Props = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
}>;

const Modal = ({ open, onClose, children }: Props) => {
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      {open && (
        <Portal>
          <S.ModalBackdrop onClick={onClose}>
            <S.ModalContainer onClick={stopPropagation}>
              <S.ModalContent>{children}</S.ModalContent>
            </S.ModalContainer>
          </S.ModalBackdrop>
        </Portal>
      )}
    </>
  );
};

export default Modal;
