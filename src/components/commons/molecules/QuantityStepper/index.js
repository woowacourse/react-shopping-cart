import PropTypes from 'prop-types';
import { UpwardIcon, DownwardIcon } from '../../';
import * as Styled from './style.js';

export const QuantityStepper = (props) => {
  const { quantity, handleQuantityChange, handleIncrement, handleDecrement } = props;

  return (
    <Styled.Container>
      <Styled.Input value={quantity} onChange={handleQuantityChange} />
      <Styled.Controller>
        <Styled.Button isUpward onClick={handleIncrement}>
          <UpwardIcon />
        </Styled.Button>
        <Styled.Button onClick={handleDecrement}>
          <DownwardIcon />
        </Styled.Button>
      </Styled.Controller>
    </Styled.Container>
  );
};

QuantityStepper.propTypes = {
  quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  handleQuantityChange: PropTypes.func.isRequired,
  handleIncrement: PropTypes.func.isRequired,
  handleDecrement: PropTypes.func.isRequired,
};

QuantityStepper.defaultProps = {
  quantity: 1,
};
