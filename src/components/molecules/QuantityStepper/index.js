import PropTypes from 'prop-types';
import { UpwardIcon, DownwardIcon } from '../../';
import * as S from './style.js';

export const QuantityStepper = (props) => {
  const { quantity, onIncrement, onDecrement, onInput, ...rest } = props;

  return (
    <S.Container {...rest}>
      <S.Input value={quantity} onChange={onInput} />
      <S.Controller>
        <S.StepperButton onClick={onIncrement} children={<UpwardIcon />} isUpward />
        <S.StepperButton onClick={onDecrement} children={<DownwardIcon />} />
      </S.Controller>
    </S.Container>
  );
};

QuantityStepper.propTypes = {
  quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onInput: PropTypes.func.isRequired,
};

QuantityStepper.defaultProps = {
  quantity: 1,
};
