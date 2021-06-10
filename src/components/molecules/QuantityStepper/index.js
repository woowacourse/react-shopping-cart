import PropTypes from 'prop-types';
import { IconUpward, IconDownward } from '../../';
import * as S from './style.js';

export const QuantityStepper = (props) => {
  const { quantity, onIncrement, onDecrement, ...rest } = props;

  return (
    <S.Container {...rest}>
      <S.Input value={quantity} />
      <S.Controller>
        <S.StepperButton onClick={onIncrement} children={<IconUpward />} isUpward />
        <S.StepperButton onClick={onDecrement} children={<IconDownward />} />
      </S.Controller>
    </S.Container>
  );
};

QuantityStepper.propTypes = {
  quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

QuantityStepper.defaultProps = {
  quantity: 1,
};
