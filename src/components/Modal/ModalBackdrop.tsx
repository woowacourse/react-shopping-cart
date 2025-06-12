import { css } from '@emotion/react';
import { MouseEvent, PropsWithChildren } from 'react';

interface ModalBackdropProps {
  handleClose: () => void;
}

const ModalBackdrop: React.FC<PropsWithChildren<ModalBackdropProps>> = ({ children, handleClose }) => {
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div css={backdropStyles} onClick={handleBackdropClick} data-testid="modal-backdrop">
      {children}
    </div>
  );
};

export default ModalBackdrop;

const backdropStyles = css({
  width: '100dvw',
  height: '100dvh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  zIndex: 0,
  left: 0,
  top: 0
});
