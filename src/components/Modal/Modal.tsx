import { ModalContext, useModalContext } from './ModalContext';
import ModalPortal from './ModalPortal';
import { backdropStyle, modalFooterStyle, modalTitleStyle, modalWrapperStyle } from './Modal.styles';
import {
  ModalBackDropProps,
  ModalMainProps,
  ModalContentProps,
  ModalTitleProps,
  ModalFooterProps
} from './Modal.types';
import useEscKeydown from '../../hooks/useEscKeydown';
import useScrollBlock from '../../hooks/useScrollBlock';
import { useClickAway } from '../../hooks/useClickAway';

function ModalMain({ isOpen, size, onClose, position, children, ...props }: ModalMainProps) {
  useEscKeydown(onClose);
  useScrollBlock(isOpen);

  if (!isOpen) return null;
  return (
    <ModalPortal {...props}>
      <ModalContext.Provider value={{ onClose, position, size }}>{children}</ModalContext.Provider>
    </ModalPortal>
  );
}

function ModalBackDrop({ ...props }: ModalBackDropProps) {
  return <div css={backdropStyle} {...props} />;
}

function ModalContent({ children, ...props }: ModalContentProps) {
  const { onClose, position, size } = useModalContext();
  const outsideRef = useClickAway<HTMLDivElement>(onClose);
  return (
    <div ref={outsideRef} css={modalWrapperStyle(position, size)} {...props}>
      {children}
    </div>
  );
}

function ModalTitle({ children, ...props }: ModalTitleProps) {
  return (
    <h2 css={modalTitleStyle} {...props}>
      {children}
    </h2>
  );
}

function ModalFooter({ align = 'right', children, ...props }: ModalFooterProps) {
  return (
    <div css={modalFooterStyle(align)} {...props}>
      {children}
    </div>
  );
}

const Modal = Object.assign(ModalMain, {
  BackDrop: ModalBackDrop,
  Content: ModalContent,
  Title: ModalTitle,
  Footer: ModalFooter
});

export default Modal;
