import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border: 1px solid rgb(221, 223, 225);
  border-radius: 3px;

  width: 101px;
  height: 36px;
`;

export const CalcButton = styled.button`
  width: 40%;
  height: 100%;

  font-size: 16px;
  text-align: center;

  cursor: pointer;
  &:hover {
    background: rgba(220, 223, 225, 0.3);
  }
`;
