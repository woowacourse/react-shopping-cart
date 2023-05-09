import styled from 'styled-components';

export const Container = styled.div`
  width: 64px;
  display: flex;
  border: 1px solid #dddddd;
  :focus-within {
    border: 1px solid #06c09e;
  }
`;

export const QuantityInput = styled.input`
  border: none;
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

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

type QuantityControlButtonProps = {
  disabled: boolean;
};

export const QuantityControlButton = styled.button<QuantityControlButtonProps>`
  background-color: #ffffff;
  border: none;
  border-left: 1px solid #dddddd;
  width: 20px;
  font-size: 8px;
  text-align: center;
  padding: 2px 0px;
  cursor: ${(props) => (props.disabled ? 'init' : 'pointer')};
  :first-child {
    border-bottom: 0.5px solid #dddddd;
  }
  :last-child {
    border-top: 0.5px solid #dddddd;
  }
`;

export const ShoppingCartIcon = styled.img`
  width: 30px;
  height: 24px;
  cursor: pointer;
  justify-self: flex-end;
`;
