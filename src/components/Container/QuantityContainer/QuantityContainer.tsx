import { MinusIcon, PlusIcon } from '../../../assets';
import * as S from './QuantityContainer.style';

interface QuantityContainerProps {
  quantity: string;
  onMinusButtonClick?: () => void;
  onPlusButtonClick?: () => void;
}

function QuantityContainer({ quantity, onMinusButtonClick, onPlusButtonClick }: QuantityContainerProps) {
  return (
    <S.Layout>
      {onMinusButtonClick && (
        <S.QuantityButton className="MinusButton" onClick={onMinusButtonClick}>
          <img src={MinusIcon}></img>
        </S.QuantityButton>
      )}
      <p>{quantity}</p>
      {onPlusButtonClick && (
        <S.QuantityButton className="PlusButton" onClick={onPlusButtonClick}>
          <img src={PlusIcon}></img>
        </S.QuantityButton>
      )}
    </S.Layout>
  );
}
export default QuantityContainer;
