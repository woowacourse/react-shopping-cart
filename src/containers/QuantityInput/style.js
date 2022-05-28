import styled from 'styled-components';

const InputWrapperStyled = styled.div`
  display: flex;
`;

const InputStyled = styled.input`
  width: 73px;
  height: 60px;
  border: 1px solid #ddd;
  border-right: none;
  font-size: 24px;
  text-align: center;

  ::-webkit-appearance,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ButtonWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;

  button {
    width: 42px;
    height: 30px;
    border: 1px solid #ddd;
    background: none;
    cursor: pointer;
  }
  .decrease {
    border-top: none;
  }
`;

export { InputWrapperStyled, InputStyled, ButtonWrapperStyled };
