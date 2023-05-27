import styled from 'styled-components';
import Colors from '../../../../constants/Colors';

export const CartItemLi = styled.li`
  display: flex;
  justify-content: space-between;

  padding: 25px 0;
  margin: 0;
  max-width: 735px;
  border-bottom: 1.5px solid ${Colors.PRODUCT_ITEM_BOTTOM_BORDER};

  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  letter-spacing: 0.5px;

  &:last-of-type {
    border: none;
  }
`;

export const NameDiv = styled.div`
  display: flex;

  column-gap: 15px;
  width: calc(100% - 100px);

  & > p {
    max-width: 400px;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const CountDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;
