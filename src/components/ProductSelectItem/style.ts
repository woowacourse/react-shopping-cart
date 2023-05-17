import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 24px 144px auto 80px;
  gap: 2%;

  padding: 3%;

  border-top: 1.5px solid #cccccc;
`;

export const ProductItemCheckbox = styled.input`
  display: none;
`;

type ProductItemCheckboxLabelProps = {
  checked: boolean;
};

export const ProductItemCheckboxLabel = styled.label<ProductItemCheckboxLabelProps>`
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 1px solid ${(props) => (props.checked ? '#333333' : '#06c09e')};
  border-radius: 3px;
  background-color: ${(props) => props.checked && '#333333'};
  position: relative;
`;

export const ProductItemCheckboxCheckIcon = styled.img`
  position: absolute;
  top: 5px;
  right: 4px;
  user-select: none;
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
