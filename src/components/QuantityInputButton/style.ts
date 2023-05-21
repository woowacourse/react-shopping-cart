import styled from 'styled-components';

interface QuantityInputButtonProps {
  disabled: boolean;
}

export const Container = styled.div`
  width: 64px;
  display: flex;
  border: 1px solid #dddddd;
  :focus-within {
    border: 1px solid #000000;
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
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const QuantityButton = styled.button<QuantityInputButtonProps>`
  background-color: #ffffff;
  border: none;
  border-left: 1px solid #dddddd;
  width: 20px;
  font-size: 8px;
  text-align: center;
  padding: 2px 0px;
  cursor: ${(props) => (props.disabled ? 'init' : 'pointer')};
`;

export const CartIcon = styled.img`
  width: 24px;
  height: 20px;
  cursor: pointer;
`;
