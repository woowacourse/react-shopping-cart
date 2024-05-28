import * as S from './styled';
import minus from '@assets/minus.svg';
import plus from '@assets/plus.svg';

interface StepperProps {
  value: number;
  handleIncrement: () => Promise<void>;
  handleDecrement: () => Promise<void>;
}

const Stepper = ({ value, handleIncrement, handleDecrement }: StepperProps) => {
  return (
    <S.Container>
      <S.Button onClick={handleDecrement} disabled={value <= 1}>
        <S.Image src={minus} alt="" />
      </S.Button>
      <S.Value>{value}</S.Value>
      <S.Button onClick={handleIncrement}>
        <S.Image src={plus} alt="" />
      </S.Button>
    </S.Container>
  );
};

export default Stepper;
