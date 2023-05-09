import styled from 'styled-components';

function QuantityControlButton() {
  return (
    <Container>
      <QuantityInput type="number" />
      <ButtonWrapper>
        <SQuantityControlButton>▲</SQuantityControlButton>
        <SQuantityControlButton>▼</SQuantityControlButton>
      </ButtonWrapper>
    </Container>
  );
}

export default QuantityControlButton;

const Container = styled.div`
  width: 66px;

  display: flex;
  :focus-within {
    outline: 1px solid #06c09e;
  }
`;

const QuantityInput = styled.input`
  border: 1px solid #dddddd;
  width: 40px;
  text-align: center;

  :focus {
    outline: none;
  }

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SQuantityControlButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #dddddd;
  width: 20px;
  font-size: 8px;
  text-align: center;
  padding: 0;
  cursor: pointer;
`;
