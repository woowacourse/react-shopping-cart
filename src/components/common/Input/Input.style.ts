import styled, { css } from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  & > input {
    padding: 8px;
    border-radius: 4px;
    ${({ theme }) => css`
      border: 1px solid ${theme.greyColor_1};
      color: ${theme.blackColor_1};
      outline-color: #141852;
    `};
  }

  & > label {
    color: ${({ theme }) => theme.blackColor_1};
    font-size: 0.95rem;
    font-weight: 600;
  }

  & > p {
    font-size: 0.7rem;
    color: ${({ theme }) => theme.greyColor_3};
  }

  & > input[type='number']::-webkit-inner-spin-button,
  & > input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
