import styled from 'styled-components';
import { COLOR } from '../../constants';

export const Container = styled.div`
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
  display: flex;
  padding: 52px 24px;
  justify-content: space-between;
  width: 100%;
`;

export const ProductListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 750px;
`;

export const ListOptionMenu = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;

export const ProductListWrapper = styled.div``;

export const ProductListHeader = styled.h3`
  font-size: 1.25rem;
  color: ${COLOR.BLACK};
  border-bottom: 4px solid ${COLOR['GRAY-500']};
  padding-bottom: 24px;
`;

export const ProductList = styled.div``;

export const ProductWrapper = styled.div`
  display: flex;
`;

export const CheckBox = styled.label`
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  position: relative;

  align-items: flex-start;
  padding-top: 1rem;

  & input:checked ~ span {
    border-color: ${COLOR.MINT};
    background-color: ${COLOR.MINT};
    color: ${COLOR.WHITE};
  }

  & > span {
    width: 28px;
    height: 28px;
    border: 1px solid ${COLOR['GRAY-100']};
    border-radius: 2px;
    transition: background-color 0.2s ease-in;
    color: transparent;
    text-align: center;
    margin-right: 0.5rem;

    &:hover {
      filter: brightness(0.95);
    }
    &:after {
      content: '✓';
      font-size: 1.5rem;
    }
  }
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
  /* justify-content: space-around; */
  padding: 20px 30px;
`;

export const ReceiptRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
