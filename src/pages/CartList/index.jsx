import useCart from 'hooks/useCart';

import { FlexContainer, Title, TextUnderline, Icon } from 'components/@common';

import { ICON_CODE } from 'constants/';

import CartItemManage from './Containers/CartItemManage';
import CartItemList from './Containers/CartItemList';
import ProductOrder from './Containers/ProductOrder';
import * as S from './styles';

export function CartList() {
  const { state } = useCart();
  const { cartItems, isLoaded, checkedItemList } = state;

  const isSelectAllChecked = checkedItemList.length > 0;

  return (
    <>
      <Title description="구매할 상품을 체크한 후 우측의 주문하기를 누르시면 상품을 주문할 수 있어요!">
        <Icon icon={ICON_CODE.CART} />
        장바구니
      </Title>

      <S.Container>
        <FlexContainer gap={16}>
          <CartItemManage isAllChecked={isSelectAllChecked} />

          <FlexContainer>
            <Title type="content" size={14}>
              장바구니 상품{'\u00A0'}
              <TextUnderline>
                {isLoaded === true ? `(${cartItems.length}개 담김)` : '(0개 담김)'}
              </TextUnderline>
            </Title>

            <CartItemList />
          </FlexContainer>
        </FlexContainer>

        <FlexContainer direction="column">
          <ProductOrder />
        </FlexContainer>
      </S.Container>
    </>
  );
}
export default CartList;
