import Text from "../common/Text";
import MinusSign from "../icons/MinusSign";
import PlusSign from "../icons/PlusSign";
import * as S from "./QuantityRegulator.styled";

interface QuantityRegulatorProps {
  quantity: number;
  handleIncrease: () => void;
  handleDecrease: () => void;
}

const QuantityRegulator = ({ quantity, handleIncrease, handleDecrease }: QuantityRegulatorProps) => {
  return (
    <S.Container>
      <S.Button onClick={handleDecrease} disabled={quantity < 2}>
        <MinusSign />
      </S.Button>
      <Text variant="body-3">{quantity}</Text>
      <S.Button onClick={handleIncrease}>
        <PlusSign />
      </S.Button>
    </S.Container>
  );
};

export default QuantityRegulator;
