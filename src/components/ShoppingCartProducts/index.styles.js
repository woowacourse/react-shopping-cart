import styled from "styled-components";

export const ShoppingCartProductsContainer = styled.div`
  flex-grow: 1;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
`;

export const ProductsControlContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 26px;
`;

export const ProductsCheckBoxContainer = styled.div`
  display: flex;
  label {
    padding-left: 12px;
  }
`;

export const ProductsCheckBox = styled.input`
  display: inline-block;
  width: 28px;
  height: 28px;
`;

export const ProductsRemoveButton = styled.button`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px 22px;
  line-height: 21.33px;
`;

export const ProductsTotalQuantity = styled.p`
  font-size: 20px;
  line-height: 33px;
  letter-spacing: 0.5px;
  padding-bottom: 16px;
  border-bottom: 4px solid #ddd;
`;
