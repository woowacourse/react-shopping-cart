import styled from 'styled-components';

export const Container = styled.li`
  display: grid;
  grid-template-columns: 24px 144px auto 80px;
  gap: 2%;

  padding: 3%;

  border-top: 1.5px solid #cccccc;
`;

export const ProductItemImage = styled.img`
  width: 144px;
  height: 147px;

  border-radius: 3px;
`;

export const ProductItemLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 15px;
`;

export const ProductItemName = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  letter-spacing: 0.5px;
`;

export const ProductItemPrice = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  letter-spacing: 0.5px;
`;

export const DeleteItemIcon = styled.img`
  width: 24px;
  height: 24px;

  cursor: pointer;
`;
