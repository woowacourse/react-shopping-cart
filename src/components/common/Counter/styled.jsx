import styled from "styled-components";

export const CounterContainer = styled.div`
  display: flex;

  width: fit-content;

  border: 1px solid ${({ theme: { color } }) => color.gray03};

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const CounterInput = styled.input`
  width: 70px;
  height: 60px;
  padding: 4px;

  text-align: center;
  font-size: ${({ theme: { fontSize } }) => fontSize.small};
  outline: none;
  border: none;
  border-right: 1px solid ${({ theme: { color } }) => color.gray03};
`;

export const CounterButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ArrowButton = styled.button`
  width: 40px;
  height: 50%;
  padding: 1px 2px;

  background-color: ${({ theme: { color } }) => color.main};
  color: ${({ theme: { color } }) => color.gray01};
  outline: none;
  border: none;
  border-bottom: 1px solid ${({ theme: { color } }) => color.gray03};

  :last-child {
    border-bottom: none;
  }

  :active {
    color: ${({ theme: { color } }) => color.point};
  }
`;
