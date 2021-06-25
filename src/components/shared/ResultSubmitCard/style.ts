import styled from 'styled-components';
import PALETTE from '../../../constants/palette';
import Button from '../../shared/Button';
import Container from '../../shared/Container';
import Text from '../../shared/Text';

export const ResultSubmitCardContainer = styled(Container)`
  border: 1px solid ${PALETTE.GRAY[300]};
  width: 28rem;
  height: 19.875rem;
`;

export const ResultTitle = styled.h3`
  display: block;
  height: 5rem;
  line-height: 5rem;
  padding: 0 2rem;
  border-bottom: 3px solid ${PALETTE.GRAY[300]};
  font-size: 1.5rem;
`;

export const ResultInnerContainer = styled(Container)`
  height: 100%;
  padding: 2rem;
  justify-content: space-between;
`;

export const ResultAmountContainer = styled(Container)`
  flex-direction: row;
  justify-content: space-between;

  ${Text} {
    color: ${PALETTE.BLACK[600]};
    font-weight: 700;
    font-size: 1.25rem;
    position: relative;

    &::after {
      content: '';
      display: block;
      background-color: ${PALETTE.BAE_MINT[500]};
      position: absolute;
      bottom: -0.15rem;
      width: 100%;
      height: 0.5rem;
      z-index: -1;
      opacity: 0.5;
    }
  }
`;

export const ResultSubmitButton = styled(Button)`
  background-color: ${PALETTE.BAE_MINT[500]};
  color: white;
  font-size: 1.5rem;

  &:disabled {
    color: ${PALETTE.GRAY[300]};
    cursor: not-allowed;
  }
`;
