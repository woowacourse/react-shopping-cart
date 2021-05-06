import styled from 'styled-components';
import Button from '../Button';
import Container from '../Container';
import Input from '../Input';
import PALETTE from '../../../constants/palette';

export const NumberInputContainer = styled(Container)`
  height: 4rem;
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
    width: 40%;
    height: 100%;
  }
`;

export const IncreaseButton = styled(Button)`
  width: 100%;
  height: 100%;
  border: 1px solid ${PALETTE.GRAY[300]};
`;

export const DecreaseButton = styled(Button)`
  width: 100%;
  height: 100%;
  border: 1px solid ${PALETTE.GRAY[300]};

  img {
    transform: rotate(180deg);
  }
`;
