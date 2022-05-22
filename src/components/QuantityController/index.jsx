import PropTypes from 'prop-types';
import Styled from 'components/QuantityController/index.style';

const QuantityController = ({ handleClick, quantity, increase, decrease }) => {
  return (
    <Styled.Container onClick={handleClick}>
      <Styled.Decrease onClick={decrease} />
      <Styled.Quantity>{quantity}</Styled.Quantity>
      <Styled.Increase onClick={increase} />
    </Styled.Container>
  );
};

QuantityController.propTypes = {
  handleClick: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  increase: PropTypes.func.isRequired,
  decrease: PropTypes.func.isRequired,
};

export default QuantityController;
