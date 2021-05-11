import PropTypes from 'prop-types';
import { UpwardIcon, DownwardIcon } from '../../';
import * as Styled from './style.js';

export const QuantityStepper = (props) => {
  const { quantity, onIncrement, onDecrement, onInput, ...rest } = props;

  return (
    <Styled.Container {...rest}>
      <Styled.Input value={quantity} onChange={onInput} />
      <Styled.Controller>
        <Styled.StepperButton onClick={onIncrement} children={<UpwardIcon />} isUpward />
        <Styled.StepperButton onClick={onDecrement} children={<DownwardIcon />} />
      </Styled.Controller>
    </Styled.Container>
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
