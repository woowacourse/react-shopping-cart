import styled from "@emotion/styled";

const CartItemContainer = styled.li`
  list-style: none;
  width: 100%;
  height: fit-content;
  border-top: ${({ theme }) => `solid 1px ${theme.colors.semiBlack}`};
`;

const CartItemHeader = styled.div`
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

const CartItemContent = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacer.spacing1};
`;

const CartItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const CartItemInfo = styled.div`
  margin-bottom: ${({ theme }) => theme.spacer.spacing4};
`;

const ItemImage = styled.img`
  width: 112px;
  height: 112px;
  border-radius: 8px;

  margin-right: ${({ theme }) => theme.spacer.spacing4};
`;

const ProductName = styled.h3`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;

  color: ${({ theme }) => theme.colors.text};
`;

export {
  CartItemContainer,
  CartItemContent,
  CartItemDetails,
  CartItemHeader,
  CartItemInfo,
  ItemImage,
  ProductName,
};
