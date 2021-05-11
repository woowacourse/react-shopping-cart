import styled from 'styled-components';

export const CartItem = styled.div`
  display: inline-flex;
  align-items: flex-start;
  width: 735px;
`;

export const Thumbnail = styled.img`
  width: 144px;
  height: 147px;
  margin-left: 15px;
  margin-right: 20px;
  background-color: ${({ theme }) => theme.GRAY_200};
`;

export const ItemContentWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const ItemContentTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 17px;
`;

export const ItemContentBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const ItemName = styled.span`
  color: ${({ theme }) => theme.TEXT_COLOR};
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.5px;
`;

export const DeleteIcon = styled.img`
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.5s;

  &:hover {
    opacity: 0.5;
  }
`;

export const Price = styled.span`
  margin-top: 19px;
  line-height: 24px;
  text-align: right;
  letter-spacing: 0.5px;
`;
