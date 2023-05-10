import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  border: 1px solid rgb(221, 223, 225);
  border-radius: 3px;

  width: 101px;
  height: 36px;
`;

export const CalcButton = styled.button`
  width: 28px;
  height: 28px;

  font-size: 16px;
  text-align: center;

  vertical-align: top;

  &:disabled {
    color: #dddddd;
  }
`;
