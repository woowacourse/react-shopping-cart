import Button from "../Button/Button";
import * as S from "./PlusMinusButton.styles";

interface PlusMinusButtonProps {
  onAddButtonClick: () => void;
  onMinusButtonClick: () => void;
  quantity: number;
}

export default function PlusMinusButton({
  onAddButtonClick,
  onMinusButtonClick,
  quantity,
}: PlusMinusButtonProps) {
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
