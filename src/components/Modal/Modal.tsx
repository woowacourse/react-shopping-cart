import React, { useRef } from 'react';
import {
  Layout,
  Overlay,
  ModalContainer,
  TitleContainer,
  Title,
  CloseButton,
  CloseIcon,
} from './Modal.styles.ts';
import { useFocusTrap } from './hooks/useFocusTrap.ts';

export type ModalPosition = 'center' | 'bottom';
export type ModalSize = 'sm' | 'md' | 'lg';

export type ModalContainerProps = {
  width?: string;
  height?: string;
  position: ModalPosition;
  size?: ModalSize;
};

type ModalProps = ModalContainerProps & {
  title?: string;
  children?: React.ReactNode;
  onClose: () => void;
};

function Modal({ width, height, position = 'center', title, onClose, children, size }: ModalProps) {
  const customWidth = position === 'center' ? width : '100%';
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const { containerRef, handleKeyDown } = useFocusTrap({
    initialFocusRef: closeButtonRef as React.RefObject<HTMLButtonElement>,
    onEscape: onClose,
  });

  const handleClickOverlay = () => {
    onClose();
  };

  return (
    <Layout onClick={handleClickOverlay}>
      <Overlay />
      <ModalContainer
        width={customWidth}
        height={height}
        position={position}
        size={size}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        {title && (
          <TitleContainer>
            <Title>{title}</Title>
            <CloseButton onClick={onClose} ref={closeButtonRef} aria-label="모달 닫기">
              <CloseIcon />
            </CloseButton>
          </TitleContainer>
        )}
        {children}
      </ModalContainer>
    </Layout>
  );
}

export default Modal;
