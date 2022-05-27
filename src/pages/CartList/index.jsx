import useCart from 'hooks/useCart';
import { getNumberFormatter } from 'lib/formatterUtils';

import { Button, FlexContainer, Title, TextUnderline, Icon } from 'components/@common';

import { ICON_CODE } from 'constants/';

import * as S from './styles';
import ItemManage from './Containers/ItemManage';
import ItemList from './Containers/ItemList';

export function CartList() {
  const { state } = useCart();
  const { cartItems, isLoaded, checkedItemList } = state;

  const isSelectAllChecked = checkedItemList.length > 0;
  const totalAmount = checkedItemList.reduce(
    (previous, { price, quantity }) => previous + price * quantity,
    0,
  );

  return (
    <>
      <Title description="구매할 상품을 체크한 후 우측의 주문하기를 누르시면 상품을 주문할 수 있어요!">
        <Icon icon={ICON_CODE.CART} />
        장바구니
      </Title>

      <S.Container>
        <FlexContainer gap={16}>
          <ItemManage isAllChecked={isSelectAllChecked} />

          <FlexContainer>
            <Title type="content" size={14}>
              장바구니 상품{'\u00A0'}
              <TextUnderline>
                {isLoaded === true ? `(${cartItems.length}개 담김)` : '(0개 담김)'}
              </TextUnderline>
            </Title>

            <ItemList />
          </FlexContainer>
        </FlexContainer>

        <FlexContainer direction="column">
          <S.OrderContainer>
            <Title type="content" size={18}>
              상품 주문하기
            </Title>

            <FlexContainer direction="row" justify="space-between">
              <TextUnderline>결제 예상 금액</TextUnderline>
              <TextUnderline>{`${getNumberFormatter(totalAmount)}원`}</TextUnderline>
            </FlexContainer>

            <FlexContainer>
              <Button state="primary">주문하기 ({checkedItemList.length}개)</Button>
            </FlexContainer>
          </S.OrderContainer>
        </FlexContainer>
      </S.Container>
    </>
  );
}
export default CartList;
