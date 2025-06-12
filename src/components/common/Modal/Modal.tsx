import { useRef } from 'react';

import { useFocusTrap } from '@/components/hooks/useFocusTrap';
import useKeyPress from '@/components/hooks/useKeyPress';
import {
  backGroundStyle,
  ModalContainerStyle,
  ModalWrapperStyle,
} from './styles';
import { ModalProps } from './types/Modal.types';
import ModalContext from './ModalContext';

export const Modal = ({
  show,
  onHide,
  showBackdrop = true,
  position = 'center',
  children,
}: ModalProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, show);
  useKeyPress('Escape', onHide, { eventType: 'keydown' });

  return (
    <ModalContext.Provider value={{ onHide }}>
      <div css={ModalWrapperStyle(show)}>
        <div css={backGroundStyle(showBackdrop)} onClick={onHide}></div>
        <div
          ref={containerRef}
          css={ModalContainerStyle(position)}
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-title'
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
};
