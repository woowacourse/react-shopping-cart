import styled from "@emotion/styled";
import { useFocusTrap } from "./hooks/useFocusTrap";
import { useEscapeKey } from "./hooks/useEscapeKey";
import { useOutsideClick } from "./hooks/useOutSideClick";

type ModalProps = {
  position?: "center" | "bottom";
  size: "small" | "medium" | "large";
  title: string;
  content: React.ReactNode;
  onClose: () => void;
  buttonElements?: React.ReactNode;
};

const Modal = ({
  position = "center",
  size,
  title,
  content,
  onClose,
  buttonElements,
}: ModalProps) => {
  const modalRef = useFocusTrap();
  useEscapeKey(onClose);
  const handleWrapperClick = useOutsideClick(onClose);

  return (
    <Overlay
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-content"
    >
      <Wrapper className={position} onClick={handleWrapperClick}>
        <ModalContainer className={`${position} ${size}`} ref={modalRef}>
          <ModalHeader>
            <ModalTitle id="modal-title">{title}</ModalTitle>
          </ModalHeader>
          <ModalContent id="modal-content">{content}</ModalContent>
          {buttonElements && <ModalFooter>{buttonElements}</ModalFooter>}
        </ModalContainer>
      </Wrapper>
    </Overlay>
  );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  &.center {
    align-items: center;
  }

  &.bottom {
    align-items: flex-end;
  }
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 24px 32px;

  &.center {
    border-radius: 8px;
  }

  &.bottom {
    border-radius: 8px 8px 0 0;
  }

  &.small {
    width: 366px;
  }

  &.medium {
    width: 480px;
  }

  &.large {
    width: 600px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
`;

const ModalContent = styled.div`
  margin-top: 24px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 18px;
`;
