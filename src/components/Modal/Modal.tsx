import ModalBackdrop from './ModalBackdrop';
import ModalHeader from './ModalHeader';
import { useEscapeHandler } from '../../hooks/useEscapeHandler';
import { css } from '@emotion/react';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

const Modal = ({ children, isOpen, handleClose }: ModalProps) => {
  useEscapeHandler(handleClose);

  if (!isOpen) return null;

  return (
    <ModalBackdrop handleClose={handleClose}>
      <div
        css={ModalFrame}
        data-testid="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-body"
      >
        <ModalHeader title={'쿠폰을 선택해 주세요'} showCloseButton handleClose={handleClose} />
        {children}
      </div>
    </ModalBackdrop>
  );
};

export default Modal;

const ModalFrame = css({
  backgroundColor: 'white',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '344px',
  maxHeight: '80dvh',
  borderRadius: '8px'
});
