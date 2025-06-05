import { ConfirmButtonStyle } from '../styles';
import ModalButton from '../../Button';

export interface ConfirmButtonProps extends React.ComponentProps<typeof ModalButton> {
  onConfirm?: () => void;
  onHide: () => void;
}

const ConfirmButton = ({
  children = '확인',
  onConfirm,
  onHide,
  disabled,
  ...rest
}: ConfirmButtonProps) => {
  const handleClick = () => {
    if (disabled) return;
    onConfirm?.(); // 사용자 정의 동작
    onHide(); // 모달 닫기
  };

  return (
    <ModalButton
      css={ConfirmButtonStyle(disabled)}
      onClick={handleClick}
      disabled={disabled}
      aria-label="확인"
      {...rest}
    >
      {children}
    </ModalButton>
  );
};

export default ConfirmButton;
