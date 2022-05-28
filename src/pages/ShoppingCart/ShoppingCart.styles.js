import styled from 'styled-components';

const ShoppingCart = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const SelectorBox = styled.div`
  width: 736px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 53px 0 26px;
`;

const SelectDeleteButton = styled.div`
  padding: 12px 22px;
  border: 1px solid ${props => props.theme.colors.gray_700};
  font-size: 16px;
`;

const ProductListHeader = styled.span`
  font-weight: 400px;
  font-size: 20px;
`;

const DivisionLine = styled.hr`
  width: 736px;
  height: 4px;
  margin-top: 16px;
  border: 0;
  background: ${props => props.theme.colors.gray_800};
`;

export { ShoppingCart, SelectorBox, SelectDeleteButton, ProductListHeader, DivisionLine };
