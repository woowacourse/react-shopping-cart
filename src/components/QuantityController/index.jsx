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

export default QuantityController;
