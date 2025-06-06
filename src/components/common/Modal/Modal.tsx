import {
  ModalBackgroundStyle,
  ModalContainerStyle,
  ModalHeaderStyle,
  CloseButtonStyle,
} from './Modal.styles.ts';
import { ModalPropsType } from '../../../types/modal.ts';

const Modal = ({
  children,
  isOpen,
  position = 'center',
  title,
  showCloseButton = true,
  onClose,
  onBackdropClick,
}: ModalPropsType) => {
  return (
    <>
      <div
        css={ModalBackgroundStyle(isOpen, position)}
        onClick={(e) => onBackdropClick?.(e)}
      >
        <div css={ModalContainerStyle(position)}>
          <div css={ModalHeaderStyle}>
            <h2>{title}</h2>
            <button css={CloseButtonStyle(showCloseButton)} onClick={onClose}>
              X
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
