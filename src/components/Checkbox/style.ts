import styled from 'styled-components';

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
