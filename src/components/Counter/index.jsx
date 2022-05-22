import PropTypes from 'prop-types';
import Styled from 'components/Counter/index.style';

const Counter = ({ quantity, increase, decrease }) => {
  return (
    <Styled.Container>
      <Styled.Count>{quantity}</Styled.Count>
      <Styled.CountButton onClick={increase}>▲</Styled.CountButton>
      <Styled.CountButton onClick={decrease}>▼</Styled.CountButton>
    </Styled.Container>
  );
};

Counter.propTypes = {
  quantity: PropTypes.number.isRequired,
  increase: PropTypes.func.isRequired,
  decrease: PropTypes.func.isRequired,
};

export default Counter;
