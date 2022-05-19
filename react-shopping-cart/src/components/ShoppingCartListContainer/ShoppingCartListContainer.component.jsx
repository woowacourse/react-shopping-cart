import styled, { css } from 'styled-components';
import Error from 'components/@shared/Error/Error.component';
import FlexBox from 'components/@shared/FlexBox/FlexBox.component';
import TextBox from 'components/@shared/TextBox/TextBox.component';
import ShoppingCartListItem from 'components/ShoppingCartListItem/ShoppingCartListItem.component';

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

function ShoppingCartListContainer({ cartData }) {
  return (
    <CartListBox>
      {Array.isArray(cartData) && cartData.length === 0 ? (
        <>
          <CartListCountTextBox mb="50px">배송 상품 (0개)</CartListCountTextBox>
          <Error>상품이 존재하지 않습니다</Error>
        </>
      ) : (
        <>
          <CartListCountTextBox>배송 상품 ({cartData.length}개)</CartListCountTextBox>
          {cartData.map(itemInfo => (
            <ShoppingCartListItem key={itemInfo.id} {...itemInfo} />
          ))}
        </>
      )}
    </CartListBox>
  );
}

export default ShoppingCartListContainer;
