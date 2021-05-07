import styled, { css } from 'styled-components';

export const HiddenCheckBox = styled.input.attrs(() => ({
  type: 'checkbox',
  name: 'checkbox',
}))`
  width: 1px;
  opacity: 0;
  position: absolute;
`;

export const StyledCheckBox = styled.label.attrs(({ onClick }) => ({
  htmlFor: 'checkbox',
  onClick,
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  text-align: center;
  color: white;
  border: 1px solid var(--color-mint);
  border-radius: 4px;
  background-color: ${({ checked }) =>
    checked ? css`var(--color-mint)` : css`var(--color-white)`};
`;
