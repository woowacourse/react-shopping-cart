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
  onCloseButtonClick,
}: ModalPropsType) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCloseButtonClick();
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
            <button
              css={CloseButtonStyle(showCloseButton)}
              onClick={onCloseButtonClick}
            >
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
