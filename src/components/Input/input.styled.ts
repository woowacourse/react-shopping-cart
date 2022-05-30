import styled from 'styled-components';

export const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  outline: 1px solid #dddddd;

  input {
    align-self: end;
    width: 73px;
    height: 60px;
    border: none;
    outline: none;
    text-align: center;
    font-size: 1.5rem;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

export const InputStepButtonBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  outline: inherit;

  button {
    height: 100%;
    background: none;
    color: inherit;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
`;
