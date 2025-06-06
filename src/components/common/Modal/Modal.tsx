import {
  ModalBackgroundStyle,
  ModalContainerStyle,
  ModalHeaderStyle,
  CloseButtonStyle,
} from './Modal.styles.ts';
import { ModalPropsType } from '../../../types/modal.ts';
import Text from '../Text/Text.tsx';

const Modal = ({
  children,
  isOpen,
  position = 'center',
  title,
  showCloseButton = true,
  onClose,
}: ModalPropsType) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div
        css={ModalBackgroundStyle(isOpen, position)}
        onClick={(e) => handleBackdropClick(e)}
      >
        <div css={ModalContainerStyle(position)}>
          <div css={ModalHeaderStyle}>
            <Text varient="subtitle" textAlign="left">
              {title}
            </Text>
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
