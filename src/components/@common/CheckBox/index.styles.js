import styled from 'styled-components';

export const HiddenCheckBox = styled.input`
  width: 1px;
  opacity: 0;
  position: absolute;
`;

export const StyledCheckBox = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
  color: white;
  border: 1px solid var(--color-mint);
  border-radius: 4px;
  background-color: ${({ isChecked }) =>
    isChecked ? 'var(--color-mint)' : 'var(--color-white)'};
`;
