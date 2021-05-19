import styled from 'styled-components';
import { COLOR } from '../../constants';

export const Header = styled.h2`
  color: ${COLOR.BLACK};
  font-size: 2rem;
  border-bottom: 4px solid ${COLOR.BLACK};
  text-align: center;
  padding-bottom: 1.5rem;
`;

export const Contents = styled.div`
  display: flex;
  padding: 52px 24px;
  justify-content: space-between;
  width: 100%;
`;

export const ProductListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 750px;

  & li {
    display: flex;
    border-bottom: 2px solid ${COLOR['GRAY-300']};
  }
`;

export const ProductListHeader = styled.h3`
  font-size: 1.25rem;
  color: ${COLOR.BLACK};
  border-bottom: 4px solid ${COLOR['GRAY-500']};
  padding-bottom: 24px;
`;

export const ReceiptWrapper = styled.div`
  width: 448px;
  max-height: 440px;
  border: 1px solid ${COLOR['GRAY-200']};
  position: sticky;
  top: 120px;
  left: 70%;
`;

export const ReceiptHeader = styled.h3`
  font-size: 1.5rem;
  color: ${COLOR.BLACK};
  border-bottom: 4px solid ${COLOR['GRAY-200']};
  padding: 20px 30px;
`;

export const ReceiptContent = styled.div`
  display: flex;
  height: 80%;
  flex-direction: column;
  padding: 20px 30px;
`;

export const ReceiptRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
