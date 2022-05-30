import styled from "@emotion/styled";

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
