import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import TextBox from 'components/@shared/TextBox/TextBox.component';

import ShoppingCartListItem from 'components/ShoppingCartListItem/ShoppingCartListItem.component';

import { addQuantityData } from 'utils';

const CartListCountTextBox = styled(TextBox).attrs({
  fontSize: 'medium',
})`
  border-bottom: 1px solid ${({ theme }) => theme.colors['GRAY_001']};
  padding: 20px 0;
  ${({ mb }) =>
    css`
      margin-bottom: ${mb};
    `}
`;

const CartListBox = styled(FlexBox).attrs({
  direction: 'column',
})`
  width: 736px;
`;

function ShoppingCartListContainer({ data }) {
  const shoppingCart = useSelector(state => state.shoppingCart);
  const cartData = shoppingCart.map(cartItem => addQuantityData(cartItem, data));

  return (
    <CartListBox>
      {Array.isArray(cartData) && cartData.length === 0 ? (
        <CartListCountTextBox as="h3" mb="50px">
          배송 상품 (0개)
        </CartListCountTextBox>
      ) : (
        <>
          <CartListCountTextBox as="h3">배송 상품 ({cartData.length}개)</CartListCountTextBox>
          <ul>
            {cartData.map(itemInfo => (
              <li key={itemInfo.id}>
                <ShoppingCartListItem {...itemInfo} />
              </li>
            ))}
          </ul>
        </>
      )}
    </CartListBox>
  );
}

export default ShoppingCartListContainer;
