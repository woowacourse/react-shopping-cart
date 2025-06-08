import closeIcon from '../../../assets/close-icon.svg';
import {
  BackDrop,
  ModalLayout,
  CloseIcon,
  ModalTitle,
  ModalContents,
  ModalButton,
  ModalButtonContainer,
  ModalInput,
} from './Modal.styled';
import { useEffect, useRef } from 'react';
import { createContext } from 'react';
import useModalContext from './hooks/useModalContext';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: 'center' | 'bottom';
  size?: 'small' | 'medium' | 'large';
};

export const ModalContext = createContext<ModalProps | null>(null);

const FOCUSABLE_SELECTORS = `
  a[href], area[href], input:not([disabled]),
  select:not([disabled]), textarea:not([disabled]),
  button:not([disabled]), iframe, object, embed,
  [tabindex]:not([tabindex="-1"])
`;

const Modal = ({
  isOpen = true,
  onClose,
  children,
  position = 'center',
  size = 'small',
}: ModalProps) => {
  const value: ModalProps = {
    isOpen,
    onClose,
    children,
    position,
  };
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    const focusableElements =
      modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];
    first?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.shiftKey && event.key === 'Tab') {
        // Shift + Tab
        if (document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
      } else if (event.key === 'Tab') {
        // Tab
        if (document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      {isOpen && (
        <ModalContext.Provider value={value}>
          <BackDrop onClick={onClose} $position={position}>
            <ModalLayout
              ref={modalRef}
              $position={position}
              $size={size}
              onClick={(event) => event.stopPropagation()}
            >
              {children}
            </ModalLayout>
          </BackDrop>
        </ModalContext.Provider>
      )}
    </>
  );
};

interface ModalTitleProps {
  title: string;
  fontSize?: string;
  fontWeight?: string;
}

const Title = ({
  title,
  fontSize = '24px',
  fontWeight = '700',
}: ModalTitleProps) => {
  return (
    <ModalTitle fontSize={fontSize} fontWeight={fontWeight}>
      {title}
    </ModalTitle>
  );
};

const CloseButton = () => {
  const modalContext = useModalContext();

  return <CloseIcon src={closeIcon} onClick={modalContext.onClose} />;
};

interface ModalContentsProps {
  children: React.ReactNode;
}

const Contents = ({ children }: ModalContentsProps) => {
  return <ModalContents>{children}</ModalContents>;
};

type ButtonProps = {
  title: string;
  backgroundColor?: string;
  textColor?: string;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  border?: string;
};

const Button = ({
  title,
  backgroundColor,
  textColor,
  size,
  border,
  onClick,
}: ButtonProps) => {
  return (
    <ModalButtonContainer>
      <ModalButton
        $backgroundColor={backgroundColor}
        $textColor={textColor}
        $size={size}
        $border={border}
        onClick={onClick}
      >
        {title}
      </ModalButton>
    </ModalButtonContainer>
  );
};

const Input = ({ placeholder }: { placeholder: string }) => {
  return <ModalInput placeholder={placeholder} />;
};

Modal.Title = Title;
Modal.CloseButton = CloseButton;
Modal.Contents = Contents;
Modal.Button = Button;
Modal.Input = Input;

export default Modal;
