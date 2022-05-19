import styled from "styled-components";

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
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;

  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const ProductAmountContainer = styled.div`
  display: flex;
`;

const ProductAmountWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_300};
  background-color: ${({ theme }) => theme.colors.WHITE};
  padding: 5px 20px;
  font-size: 20px;
`;

const ProductCounterContainer = styled.div`
  display: flex;
  flex-direction: column;

  button {
    border: 1px solid ${({ theme }) => theme.colors.GRAY_300};
    background-color: ${({ theme }) => theme.colors.WHITE};
    padding: 5px 10px;
    font-size: 10;
    cursor: pointer;
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
