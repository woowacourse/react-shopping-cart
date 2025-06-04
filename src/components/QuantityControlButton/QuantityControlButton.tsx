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
      <Button css={S.controlButton} onClick={onMinusButtonClick}>
        <p css={S.controlButtonText}>-</p>
      </Button>
      <p css={S.quantityText}>{quantity}</p>
      <Button css={S.controlButton} onClick={onAddButtonClick}>
        <p css={S.controlButtonText}>+</p>
      </Button>
    </S.ButtonWrapper>
  );
}
