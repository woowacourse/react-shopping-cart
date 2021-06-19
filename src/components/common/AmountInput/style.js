import styled from 'styled-components';
import PALETTE from '../../../constants/palette';

export const AmountInputContainer = styled.div`
  border: 1px solid ${PALETTE.GRAY_004};
  width: 7.125rem;
  height: 3.75rem;
  display: flex;
`;

export const NumberContainer = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  border-right: 1px solid ${PALETTE.GRAY_004};
  text-align: center;
  font-size: 1.5rem;
  outline: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const ButtonContainer = styled.div`
  width: 2.6rem;
  height: 100%;
  display: flex;
  flex-direction: column;

  & > button {
    background-color: transparent;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &:first-child {
      height: calc(50% + 0.5px);
      border-bottom: 1px solid ${PALETTE.GRAY_004};

      &::after {
        content: '';
        width: 0;
        height: 0;
        display: block;
        border-left: 0.6rem solid transparent;
        border-right: 0.6rem solid transparent;
        border-bottom: 0.6rem solid ${PALETTE.BLACK};
        transform: scaleX(0.6);
      }

      &:hover::after {
        transform: scale(0.8, 1.2);
      }
    }

    &:last-child {
      height: calc(50% - 0.5px);

      &::after {
        content: '';
        width: 0;
        height: 0;
        display: block;
        border-left: 0.6rem solid transparent;
        border-right: 0.6rem solid transparent;
        border-top: 0.6rem solid ${PALETTE.BLACK};
        transform: scaleX(0.6);
      }

      &:hover::after {
        transform: scale(0.8, 1.2);
      }
    }
  }
`;
