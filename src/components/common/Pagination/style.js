import styled, { css } from 'styled-components';

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const button = css`
  width: 3rem;
  height: 2.4rem;
  background: transparent;
  border: none;
  ${({ disabled }) => !disabled && 'cursor: pointer;'}
`;

export const PreviousButton = styled.button`
  transform: scaleX(-1);

  ${flexCenter}
  ${button}

  ${({ disabled }) =>
    !disabled &&
    `
      &:hover {
        transform: scale(-1.2);
      }
    `}
`;

export const NextButton = styled.button`
  ${flexCenter}
  ${button}

  ${({ disabled }) =>
    !disabled &&
    `
      &:hover {
        transform: scale(1.2);
      }
    `}
`;

export const NumbersContainer = styled.div`
  display: flex;
  min-width: 10rem;
  justify-content: space-evenly;
  align-items: center;
  margin: 2rem;
  cursor: pointer;
`;

export const PageNumber = styled.p`
  font-size: 1.3rem;
  margin: 1rem;
  padding: 1rem;
  cursor: pointer;
`;
