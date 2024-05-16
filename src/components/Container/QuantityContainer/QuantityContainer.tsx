import { MinusIcon, PlusIcon } from '../../../assets';
import * as S from './QuantityContainer.style';

interface QuantityContainerProps {
  quantity: number;
  onMinusButtonClick: () => void;
  onPlusButtonClick: () => void;
}

function QuantityContainer({ quantity, onMinusButtonClick, onPlusButtonClick }: QuantityContainerProps) {
  return (
    <S.Layout>
      <S.QuantityButton className="MinusButton" onClick={onMinusButtonClick}>
        <img src={MinusIcon}></img>
      </S.QuantityButton>
      <p>{quantity}</p>
      <S.QuantityButton className="PlusButton" onClick={onPlusButtonClick}>
        <img src={PlusIcon}></img>
      </S.QuantityButton>
    </S.Layout>
  );
}
export default QuantityContainer;
