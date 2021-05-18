import styled from 'styled-components';
import { Button } from '../../';
import { BAEMIN_CYAN } from '../../../constants';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Interjection = styled.h3`
  margin: 5rem 0;
  font-family: 'BMYEONSUNG';
  font-weight: 200;
  color: #bbbbbb;
  font-size: 7rem;
  letter-spacing: 0.7rem;
  text-shadow: 0.75rem 0.75rem 1rem rgba(0, 0, 0, 0.15);
`;

export const Notice = styled.span`
  font-weight: 500;
  color: #666666;
  font-size: 1.25rem;
`;

export const RedirectButton = styled(Button)`
  margin: 1.5rem 0;
  font-size: 1.25rem;
  background-color: ${BAEMIN_CYAN};
  color: #ffffff;
  width: 12rem;
  height: 3rem;
`;
