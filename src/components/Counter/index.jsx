import Styled from './index.style';

const Counter = ({ quantity, increase, decrease }) => {
  return (
    <Styled.Counter>
      <Styled.Count>{quantity}</Styled.Count>
      <Styled.CountButton onClick={increase}>▲</Styled.CountButton>
      <Styled.CountButton onClick={decrease}>▼</Styled.CountButton>
    </Styled.Counter>
  );
};

export default Counter;
