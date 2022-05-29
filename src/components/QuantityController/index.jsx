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
  /**
   * QuantityController 클릭이벤트를 처리하는 함수
   */
  handleClick: PropTypes.func.isRequired,
  /**
   * 세어지는 변수
   */
  quantity: PropTypes.number.isRequired,
  /**
   * quantity를 증가시키는 함수
   */
  increase: PropTypes.func.isRequired,
  /**
   * quantity를 감소시키는 함수
   */
  decrease: PropTypes.func.isRequired,
};

export default QuantityController;
