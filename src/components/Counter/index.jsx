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

export default Counter;
