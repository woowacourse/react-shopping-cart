import styled from 'styled-components';
import { Button } from '../../';
import { baeminCyan } from '../../../../constants';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.125rem solid #dddddd;
`;

export const Title = styled.h3`
  margin: 0;
  padding: 1.5rem 1.875rem;
  width: 100%;
  font-size: 1.5rem;
  font-weight: 400;
  color: #333333;
  border-bottom: 0.125rem solid #dddddd;
  box-sizing: border-box;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.5rem 1.875rem;
  box-sizing: border-box;
`;

export const Bill = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4.25rem;
`;

export const CheckoutButton = styled(Button)`
  font-size: 1.5rem;
  background-color: ${baeminCyan};
  color: #ffffff;
  width: 100%;
  height: 4.5rem;
`;
