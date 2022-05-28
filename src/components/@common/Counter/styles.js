import styled from '@emotion/styled';

import { COLORS } from 'styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;

  border: 1px solid ${COLORS.GRAY_150};
  background-color: ${COLORS.WHITE};
  grid-template-columns: repeat(auto-fit, minmax(1rem, 1fr));

  overflow: hidden;
`;

const CounterText = styled.input`
  font-weight: bold;
  text-align: center;
  width: 100%;

  border: none;
  border-right: 1px solid ${COLORS.GRAY_150};

  padding: 0 0.5rem;

  &:hover,
  &:focus {
    outline: none;
  }
`;

const ControlButton = styled.button`
  cursor: pointer;

  border: none;
  background-color: unset;
  color: ${COLORS.GRAY_50};

  font-size: 0.7rem;
  padding: 0.2rem 0.7rem;

  transition: background-color 0.2s ease, color 0.2s ease;

  &:first-of-type {
    border-bottom: 1px solid ${COLORS.GRAY_150};
  }

  &:hover {
    color: ${COLORS.MINT_400};
    background-color: ${COLORS.GRAY_200};
  }

  &:disabled {
    cursor: default;
    color: ${COLORS.GRAY_100};
    background-color: ${COLORS.GRAY_200};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export { Container, CounterText, ControlButton, ButtonContainer };
