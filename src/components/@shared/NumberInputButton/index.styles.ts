import styled from "@emotion/styled";

export const NumberInputButtonContainer = styled.div`
  display: flex;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const operatorButton = styled.button`
  width: 40px;
  height: 30px;
  background-color: inherit;
  border: 1px solid #dddddd;
`;

export const Image = styled.img`
  object-fit: contain;
  width: 1rem;
  height: 1rem;
`;

export const Input = styled.input`
  text-align: right;
  border: 1px solid #dddddd;
  width: 70px;
  height: 60px;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
