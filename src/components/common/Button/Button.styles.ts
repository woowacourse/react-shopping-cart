import styled, { css } from 'styled-components';

import { ButtonProps } from './Button';

const getVariantStyling = (variant: Required<ButtonProps>['variant']) => {
  const style = {
    default: css`
      background-color: ${({ theme }) => theme.color.white};
      color: ${({ theme }) => theme.color.black};
      border: 1px solid ${({ theme }) => theme.color.gray3};

      &:hover:enabled {
        background-color: ${({ theme }) => theme.color.gray1};
      }
    `,
    primary: css`
      background-color: ${({ theme }) => theme.color.primary};
      color: ${({ theme }) => theme.color.white};
      border: 1px solid ${({ theme }) => theme.color.primary};

      &:hover:enabled {
        background-color: ${({ theme }) => theme.color.primaryDark};
        border: 1px solid ${({ theme }) => theme.color.primaryDark};
      }

      &:focus {
        box-shadow: 0 0 0 3px ${({ theme }) => theme.color.primary};
      }
    `,
    secondary: css`
      background-color: ${({ theme }) => theme.color.white};
      color: ${({ theme }) => theme.color.primary};
      border: 1px solid ${({ theme }) => theme.color.primary};

      &:focus {
        background-color: ${({ theme }) => theme.color.primaryLight1};
        outline: 0 !important;
      }
    `,
    textButton: css`
      &:hover:enabled {
        background-color: ${({ theme }) => theme.color.gray1};
      }

      &:focus {
        box-shadow: 0 0 0 3px ${({ theme }) => theme.color.gray1};
      }
    `,
    danger: css`
      background-color: ${({ theme }) => theme.color.red};
      color: ${({ theme }) => theme.color.white};

      &:hover:enabled {
        background-color: ${({ theme }) => theme.color.darkRed};
      }

      &:focus {
        box-shadow: 0 0 0 3px ${({ theme }) => theme.color.red};
      }
    `,
  };

  return style[variant];
};

const getSizeStyling = (size: Required<ButtonProps>['size']) => {
  const style = {
    small: css`
      padding: 12px;
      font-size: 14px;
      font-weight: 500;
    `,
    medium: css`
      padding: 14px;
      font-size: 16px;
    `,
    large: css`
      padding: 16px 14px;
      font-size: 16px;
    `,
  };

  return style[size];
};

const Button = styled.button<ButtonProps>`
  width: 100%;
  background-color: transparent;
  font-weight: 600;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  outline: 0 solid ${({ theme }) => theme.color.white};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  ${({ variant = 'default' }) => getVariantStyling(variant)}
  ${({ size = 'medium' }) => getSizeStyling(size)}

  &:focus {
    outline: 1px solid ${({ theme }) => theme.color.white};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.color.gray3};
    border-color: ${({ theme }) => theme.color.gray3};
  }
`;

export { Button };
