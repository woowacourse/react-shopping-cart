/** @jsxImportSource @emotion/react */
import { createContext, useContext, useRef } from 'react';

import BaseButton from '../Button';
import CancelButton from './Button/CancelButton';
import ConfirmButton from './Button/ConfirmButton';
import {
  backGroundStyle,
  ModalBodyStyle,
  ModalCloseStyle,
  ModalContainerStyle,
  ModalFooterStyle,
  ModalHeaderStyle,
  ModalTitleStyle,
  ModalWrapperStyle,
} from './styles';
import {
  ChildrenProps,
  ModalContextType,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
  ModalTitleProps,
} from './types/Modal.types';
import { useFocusTrap } from '@/components/hooks/useFocusTrap';
import useKeyPress from '@/components/hooks/useKeyPress';

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

export const Modal = ({
  show,
  onHide,
  showBackdrop = true,
  position = 'center',
  // size = 'medium',
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

const ModalHeader = ({ closeButton = false, children }: ModalHeaderProps) => {
  const { onHide } = useModalContext();

  return (
    <div css={ModalHeaderStyle}>
      <span>{children}</span>
      {closeButton && (
        <button css={ModalCloseStyle} onClick={onHide} aria-label='닫기'>
          <svg
            width='15'
            height='14'
            viewBox='0 0 15 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M14.4922 1.41L13.0822 0L7.49219 5.59L1.90219 0L0.492188 1.41L6.08219 7L0.492188 12.59L1.90219 14L7.49219 8.41L13.0822 14L14.4922 12.59L8.90219 7L14.4922 1.41Z'
              fill='black'
            />
          </svg>
        </button>
      )}
    </div>
  );
};

const ModalBody = ({ children }: ChildrenProps) => {
  return <div css={ModalBodyStyle}>{children}</div>;
};

const ModalFooter = ({ buttonAlign = 'left', children }: ModalFooterProps) => {
  return <div css={ModalFooterStyle(buttonAlign)}>{children}</div>;
};

const ModalTitle = ({ color = '#000', children }: ModalTitleProps) => {
  return (
    <span id='modal-title' css={ModalTitleStyle(color)}>
      {children}
    </span>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Title = ModalTitle;
Modal.Button = BaseButton;
Modal.ConfirmButton = ConfirmButton;
Modal.CancelButton = CancelButton;
