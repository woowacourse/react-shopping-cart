import styled, { css } from 'styled-components';

export const InputWrapper = styled.div<{ isError: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;

  & > input {
    padding: 8px;
    border-radius: 4px;
    ${({ theme, isError }) => css`
      border: 1px solid ${theme.greyColor_1};
      color: ${theme.blackColor_1};
      outline-color: ${isError ? theme.redColor_1 : theme.brandColor_1};
    `};
  }

  & > label {
    font-size: 0.95rem;
    font-weight: 600;
    ${({ theme, isError }) => css`
      color: ${isError ? theme.redColor_1 : theme.blackColor_1};
    `};
  }

  & > p {
    font-size: 0.7rem;
    ${({ theme, isError }) => css`
      color: ${isError ? theme.redColor_1 : theme.brandColor_1};
    `};
  }

  & > input[type='number']::-webkit-inner-spin-button,
  & > input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
