import styled from "styled-components";
import { alignCenter, directionColumn } from "../../styles/mixin";

const CartProductContainer = styled.div`
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY_300};
`;

const ProductImageContainer = styled.div`
  display: flex;
  flex: 1;
  margin: 0 10px;

  img {
    width: 120px;
    height: 120px;
    margin-right: 10px;
  }
`;

const ProductOptionContainer = styled.div`
  ${directionColumn};
  align-items: flex-end;
  justify-content: space-between;

  img {
    width: 20px;
    height: 20px;
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }
  }
`;

const ProductAmountContainer = styled.div`
  display: flex;
`;

const ProductAmountWrapper = styled.div`
  ${alignCenter};
  border: 1px solid ${({ theme }) => theme.colors.GRAY_300};
  background-color: ${({ theme }) => theme.colors.WHITE};
  padding: 5px 20px;
  font-size: 20px;
`;

const ProductCounterContainer = styled.div`
  ${directionColumn};

  button {
    border: 1px solid ${({ theme }) => theme.colors.GRAY_300};
    background-color: ${({ theme }) => theme.colors.WHITE};
    padding: 5px 10px;
    font-size: 10;
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }
  }
`;

export {
  CartProductContainer,
  ProductImageContainer,
  ProductOptionContainer,
  ProductAmountContainer,
  ProductAmountWrapper,
  ProductCounterContainer,
};
