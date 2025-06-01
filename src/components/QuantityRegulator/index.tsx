import Text from "../common/Text";
import MinusSign from "../icons/MinusSign";
import PlusSign from "../icons/PlusSign";
import TrashCan from "../icons/TrashCan";
import * as S from "./QuantityRegulator.styled";

interface QuantityRegulatorProps {
  quantity: number;
  maxStock: number;
  handleIncrease: () => void;
  handleDecrease: () => void;
}

const QuantityRegulator = ({ quantity, maxStock, handleIncrease, handleDecrease }: QuantityRegulatorProps) => {
  return (
    <S.Container>
      <S.Button onClick={handleDecrease}>{quantity === 1 ? <TrashCan /> : <MinusSign />}</S.Button>
      <Text variant="body-3">{quantity}</Text>
      <S.Button onClick={handleIncrease} isMaxStock={maxStock === quantity}>
        <PlusSign />
      </S.Button>
    </S.Container>
  );
};

export default QuantityRegulator;
