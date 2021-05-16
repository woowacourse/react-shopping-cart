import styled, { css } from 'styled-components';
import Button from '../Button';
import Container from '../Container';
import Input from '../Input';
import PALETTE from '../../../constants/palette';

export const NumberInputContainer = styled(Container)`
  height: 3.625rem;
  width: 7.125rem;
  flex-direction: row;
  border: 1px solid ${PALETTE.GRAY[300]};

  ${Input} {
    width: 60%;
    height: 100%;
    font-size: 1.5rem;
    text-align: center;

    &::-webkit-inner-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      appearance: none;
    }
  }

  ${Container} {
    position: relative;
    width: 40%;
    height: 100%;
    box-sizing: border-box;
  }
`;

const ButtonStyle = css`
  position: absolute;
  width: 100%;
  height: 50%;
  border: 1px solid ${PALETTE.GRAY[300]};
  border-radius: 0;
  border-right: none;
  right: 0;
`;

export const IncreaseButton = styled(Button)`
  ${ButtonStyle}
  top:0;
  border-top: none;
`;

export const DecreaseButton = styled(Button)`
  ${ButtonStyle}
  bottom:0;
  border-top: none;
  border-bottom: none;

  img {
    transform: rotate(180deg);
  }
`;
