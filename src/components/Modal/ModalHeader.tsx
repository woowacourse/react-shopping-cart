import { css } from '@emotion/react';

interface ModalHeaderProps {
  title: string;
  showCloseButton?: boolean;
  handleClose?: () => void;
}

const ModalHeader = ({ title, showCloseButton = false, handleClose }: ModalHeaderProps) => (
  <section css={headerStyles}>
    {title && <h3 id="modal-title">{title}</h3>}
    {showCloseButton && (
      <button css={closeButtonStyles} onClick={handleClose}>
        X
      </button>
    )}
  </section>
);

export default ModalHeader;

const headerStyles = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  paddingBottom: '24px'
});

const closeButtonStyles = css({
  all: 'unset',
  width: '32px',
  height: '32px',
  cursor: 'pointer',
  borderRadius: '50%',
  fontSize: '16px',
  textAlign: 'center',
  lineHeight: '36px',

  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  }
});
