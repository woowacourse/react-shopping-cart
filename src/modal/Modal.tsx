import { useEffect, useRef } from "react";
import { CloseButton, ModalHeader, SubmitButton, Title } from "./Modal.styles";

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  handleModalButtonClick: () => void;
  buttonLabel: string;
  children: React.ReactNode;
}

function Modal({
  title,
  open,
  onClose,
  handleModalButtonClick,
  buttonLabel,
  children,
}: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleCloseModal = () => {
    if (!modalRef.current) {
      return;
    }

    modalRef.current.close();
  };

  const handleOpenModal = () => {
    if (!modalRef.current) {
      return;
    }

    modalRef.current.showModal();
  };

  useEffect(() => {
    if (open) {
      handleOpenModal();
    } else {
      handleCloseModal();
    }
  }, [open]);

  return (
    <dialog ref={modalRef} onClose={onClose}>
      <div css={ModalHeader}>
        <h2 css={Title}>{title}</h2>
        <button css={CloseButton} onClick={handleCloseModal}>
          <img src="close-button.svg" alt="모달 닫기 버튼" />
        </button>
      </div>
      {children}
      <button css={SubmitButton} onClick={handleModalButtonClick}>
        {buttonLabel}
      </button>
    </dialog>
  );
}

export default Modal;
