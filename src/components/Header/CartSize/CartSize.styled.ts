import { styled } from 'styled-components';

export const CartSize = styled.div`
  position: absolute;
  top: -6px;
  right: 1px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;

  width: 16px;
  height: 16px;

  background-color: var(--red);

  font-size: 10px;
  color: var(--grey-100);
`;
