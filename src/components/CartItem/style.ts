import styled from '@emotion/styled';

export const CartItemWrapper = styled.li`
  list-style: none;
  width: 100%;
  height: fit-content;
  border-top: ${({ theme }) => `solid 1px ${theme.colors.semiBlack}`};
`;

export const CartItemHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  margin: 12px 0;

  .deleteBtn {
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;
    text-align: center;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const CartItemContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacer.spacing1};
`;

export const CartItemInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

export const CartItemImage = styled.img`
  width: 112px;
  height: 112px;
  border-radius: 8px;

  margin-right: ${({ theme }) => theme.spacer.spacing4};
`;

export const ProductName = styled.h3`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;

  color: ${({ theme }) => theme.colors.text};
`;

export const QuantityContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacer.spacing4};
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Quantity = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: center;
`;
