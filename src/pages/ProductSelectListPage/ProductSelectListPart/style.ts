import styled from 'styled-components';

export const ProductSelectListPart = styled.div`
  padding: 1%;

  & > * {
    margin-bottom: 2%;
  }
`;

export const ProductSelectListTitle = styled.p`
  font-size: 20px;
  line-height: 33px;

  letter-spacing: 0.5px;
`;

export const ProductSelectList = styled.ul`
  border-top: 4px solid #aaaaaa;
  align-content: center;
  padding: 0;
  min-height: 30px;
`;

export const ProductSelectController = styled.div`
  display: grid;
  grid-template-columns: 45px auto 80px;
  align-items: center;
`;

export const SelectedProductAmount = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;

  letter-spacing: 0.5px;
`;

export const SelectedProductDeleteButton = styled.button`
  border: 1px solid #dddddd;
  background-color: rgba(0, 0, 0, 0);

  font-size: 13px;
  height: 30px;
`;
