import { useEffect } from "react";
import MinusIcon from "../Icon/MinusIcon";
import PlusIcon from "../Icon/PlusIcon";
import * as S from "./QuantityButton.styled";

interface QuantityButtonProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  disabled?: boolean;
}

function QuantityButton({
  quantity,
  onIncrease,
  onDecrease,
  disabled = false,
}: QuantityButtonProps) {
  return (
    <S.QuantityButtonContainer>
      <S.QuantityButton
        onClick={onDecrease}
        disabled={disabled || quantity <= 0}
      >
        <MinusIcon />
      </S.QuantityButton>
      <S.QuantityButtonText>{quantity}</S.QuantityButtonText>
      <S.QuantityButton onClick={onIncrease} disabled={disabled}>
        <PlusIcon />
      </S.QuantityButton>
    </S.QuantityButtonContainer>
  );
}

export default QuantityButton;
