import { ChangeEvent } from 'react';
import * as S from './QuantityCounter.style';

interface QuantityCounterProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  ariaIncreaseLabel: string;
  ariaDecreaseLabel: string;
}

function QuantityCounter({
  quantity,
  onIncrease,
  onDecrease,
  onChange,
  ariaIncreaseLabel,
  ariaDecreaseLabel,
}: QuantityCounterProps) {
  return (
    <S.CartBox>
      <S.QuantityInput value={quantity} onChange={onChange} />
      <S.ButtonBox>
        <S.QuantityControlButton onClick={onIncrease} aria-label={ariaIncreaseLabel} role="button">
          ⏶
        </S.QuantityControlButton>
        <S.QuantityControlButton onClick={onDecrease} aria-label={ariaDecreaseLabel} role="button">
          ⏷
        </S.QuantityControlButton>
      </S.ButtonBox>
    </S.CartBox>
  );
}

export default QuantityCounter;
