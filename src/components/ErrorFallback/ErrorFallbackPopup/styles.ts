import styled from 'styled-components';
import PALETTE from '../../../constants/palette';
import Button from '../../shared/Button';

export const StyledModal = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.3);
`;

export const ModalInner = styled.div`
  box-sizing: border-box;
  width: 20rem;
  height: 14rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background-color: white;
  border-radius: 1.25rem;
  padding: 1rem;
`;

export const ModalHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1rem 0;
`;

export const ResetButton = styled(Button)`
  width: 100%;
  height: 3rem;

  background-color: ${PALETTE.BAE_MINT[500]};
  color: white;
  border-radius: 0.625rem;
`;
