import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;

  width: 80px;
  height: 30px;
  background-color: var(--grey-100);
  border: 1px solid var(--grey-200);
  border-radius: 7px;

  & > * {
    flex: 1;
  }
`;

export const CountInput = styled.input`
  border: none;
  width: 0;

  text-align: center;

  &:focus {
    outline: none;
  }
`;
