import styled from 'styled-components';
import { COLOR } from '../../constants';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.h2`
  color: ${COLOR.BLACK};
  font-size: 2rem;
  border-bottom: 4px solid ${COLOR.BLACK};
  text-align: center;
  padding-bottom: 1.5rem;
`;

export const Contents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 55px;
`;

export const OrderWrapper = styled.div`
  width: 100%;
  border: 1px solid ${COLOR['GRAY-500']};
  margin-bottom: 74px;
`;

export const OrderHeader = styled.div`
  display: flex;
  align-items: center;
  height: 90px;
  padding-left: 40px;
  background: ${COLOR['GRAY-100']};
  font-size: 1.25rem;
`;

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
