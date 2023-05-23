import { styled } from 'styled-components';

export const Checkbox = styled.input`
  position: relative;
  width: 28px;
  height: 28px;
  margin-right: 14px;
  border: 1px solid var(--gray-color-200);
  accent-color: var(--text-color);
  cursor: pointer;

  @media (max-width: 548px) {
    min-width: 20px;
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;
