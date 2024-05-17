import { MinusIcon, PlusIcon } from '../../../assets';
import * as S from './QuantityStepper.style';

interface QuantityStepperProps {
  quantity: number;
  onMinusButtonClick: () => void;
  onPlusButtonClick: () => void;
}

function QuantityStepper({ quantity, onMinusButtonClick, onPlusButtonClick }: QuantityStepperProps) {
  return (
    <S.Layout>
      <S.QuantityButton onClick={onMinusButtonClick}>
        <img src={MinusIcon} alt="마이너스 아이콘" />
      </S.QuantityButton>
      <p>{quantity}</p>
      <S.QuantityButton onClick={onPlusButtonClick}>
        <img src={PlusIcon} alt="플러스 아이콘" />
      </S.QuantityButton>
    </S.Layout>
  );
}
export default QuantityStepper;
