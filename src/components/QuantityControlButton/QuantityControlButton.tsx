import Button from '../Button/Button';
import * as S from './QuantityControlButton.styles';

interface QuantityControlButtonProps {
  onAddButtonClick: () => void;
  onMinusButtonClick: () => void;
  quantity: number;
}

export default function QuantityControlButton({
  onAddButtonClick,
  onMinusButtonClick,
  quantity,
}: QuantityControlButtonProps) {
  return (
    <S.ButtonWrapper>
      <Button css={S.ControlButton} onClick={onMinusButtonClick}>
        <p css={S.ControlButtonText}>-</p>
      </Button>
      <p css={S.QuantityText}>{quantity}</p>
      <Button css={S.ControlButton} onClick={onAddButtonClick}>
        <p css={S.ControlButtonText}>+</p>
      </Button>
    </S.ButtonWrapper>
  );
}
