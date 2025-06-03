import Button from "../Button/Button";
import Text from "../Text/Text";
import * as S from "./PlusMinusButton.styles";

interface PlusMinusButtonProps {
  onAddButtonClick: () => void;
  onMinusButtonClick: () => void;
  quantity: number;
  isLoading?: boolean;
}

export default function PlusMinusButton({
  onAddButtonClick,
  onMinusButtonClick,
  quantity,
  isLoading,
}: PlusMinusButtonProps) {
  return (
    <S.ButtonWrapper>
      <Button css={S.controlButton} onClick={onMinusButtonClick} isLoading={isLoading}>
        <Text css={S.controlButtonText} variant="body-0">
          -
        </Text>
      </Button>
      <Text variant="body-2" css={S.quantityText}>
        {quantity}
      </Text>
      <Button css={S.controlButton} onClick={onAddButtonClick} isLoading={isLoading}>
        <Text css={S.controlButtonText} variant="body-0">
          +
        </Text>
      </Button>
    </S.ButtonWrapper>
  );
}
