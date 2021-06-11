import styled from 'styled-components';
import PALETTE from '../../../constants/palette';
import { Z_INDEX } from '../../../constants/style';
import Button from '../../shared/Button';

export const StyledPopup = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  z-index: ${Z_INDEX.FOREGROUND};
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.2);
`;

export const PopupInner = styled.div`
  box-sizing: border-box;
  width: 24rem;
  height: 16rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background-color: white;
  border: 1px solid ${PALETTE.GRAY[300]};
  border-radius: 1.25rem;
  padding: 1.5rem;
`;

export const PopupHeader = styled.h2`
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
