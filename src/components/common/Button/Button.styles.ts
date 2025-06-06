import { css } from '@emotion/react';

export const ButtonStyle = (
  color: 'black' | 'white' | 'gray',
  variant: 'primary' | 'secondary'
) => css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  ${(color === 'black' || color === 'gray') &&
  css`
    color: #fff;
    background: #000;
    border: none;
  `}

  ${color === 'white' &&
  css`
    color: #333;
    background: #fff;
    border: 1px solid #e0e0e0;
  `}

  ${variant === 'primary' &&
  css`
    position: fixed;
    max-width: 43rem;
    transform: translateX(-50%);
    bottom: 0;
    left: 50%;
    border-radius: 0;
    height: 6.4rem;
    padding: 2.4rem;
  `}

  ${variant === 'secondary' &&
  css`
    border-radius: 5px;
    height: 4.8rem;
    margin-top: 1.2rem;
    padding: 1.2rem 3rem;
  `} 

  cursor: pointer;
`;
