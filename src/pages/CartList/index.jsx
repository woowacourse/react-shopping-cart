import useCart from 'hooks/useCart';
import { getNumberFormatter } from 'lib/formatterUtils';

import { Case, SwitchAsync } from 'components/@common/SwitchAsync';
import StatusMessage from 'components/@common/StatusMessage';
import FlexContainer from 'components/@common/FlexContainer';
import Button from 'components/@common/Button';
import Checkbox from 'components/@common/Checkbox';
import ToolTip from 'components/@common/ToolTip';
import Icon from 'components/@common/Icon';
import Title from 'components/@common/Title';
import TextUnderline from 'components/@common/TextUnderline';
import CartItem from 'components/CartItem';

import { ICON_CODE } from 'constants/';

import * as S from './styles';

export function CartList() {
  const { action: cartAction, state } = useCart();
  const { cartItems, isLoading, isLoaded, errorMessage, checkedItemList } = state;

  const isSelectAllChecked = checkedItemList.length > 0;
  const totalAmount = checkedItemList.reduce(
    (previous, { price, quantity }) => previous + price * quantity,
    0,
  );

  const handleCheckItem = (id, isChecked) => {
    cartAction.updateItemChecked(id, isChecked);
  };

  const handleAllCheckItem = () => {
    cartAction.updateItemAllChecked(!isSelectAllChecked);
  };

  const handleChangeQuantity = (id, quantity) => {
    cartAction.updateItem(id, { quantity }).then((status) => {
      status === false && alert('서버 오류로 인해 상품 정보 갱신에 실패하였습니다.');
    });
  };

  const handleRemoveItem = (id) => {
    if (!confirm('정말 해당 상품을 장바구니에서 제거하시겠습니까?')) {
      return;
    }

    cartAction.removeItem(id).then((status) => {
      status ? alert('해당 상품을 제거하였습니다.') : alert('해당 상품 제거에 실패하였습니다.');
    });
  };

  const handleRemoveItemList = () => {
    if (!confirm('정말 선택한 상품을 모두 제거하시겠습니까?')) {
      return;
    }

    const checkedIdList = checkedItemList.map(({ id }) => id);

    cartAction.removeItemList(checkedIdList).then((status) => {
      status ? alert('선택한 상품이 제거되었습니다.') : alert('선택한 상품 제거에 실패하였습니다.');
    });
  };

  return (
    <>
      <Title description="구매할 상품을 체크한 후 우측의 주문하기를 누르시면 상품을 주문할 수 있어요!">
        <Icon icon={ICON_CODE.CART} />
        장바구니
      </Title>

      <S.Container>
        <FlexContainer gap={16}>
          <S.ControllerContainer>
            <Checkbox size="medium" checked={isSelectAllChecked} onChange={handleAllCheckItem}>
              {isSelectAllChecked ? '선택 해제' : '전체 선택'}
            </Checkbox>
            <ToolTip text="선택한 상품을 장바구니에서 삭제합니다." align="bottom">
              <Button icon={ICON_CODE.TRASH} onClick={handleRemoveItemList}>
                선택 삭제
              </Button>
            </ToolTip>
          </S.ControllerContainer>

          <FlexContainer>
            <Title type="content" size={14}>
              장바구니 상품{'\u00A0'}
              <TextUnderline>
                {isLoaded === true ? `(${cartItems.length}개 담김)` : '(0개 담김)'}
              </TextUnderline>
            </Title>

            <FlexContainer direction="column" justify="center">
              <SwitchAsync
                isLoading={isLoading}
                isError={!!errorMessage}
                isContentLoaded={isLoaded}
              >
                <Case.Success>
                  {(cartItems.length > 0 &&
                    cartItems.map(({ id, image, name, price, quantity, isChecked }) => (
                      <CartItem
                        key={id}
                        id={id}
                        image={image}
                        name={name}
                        price={price}
                        quantity={quantity}
                        isChecked={isChecked}
                        onChangeCheckBox={handleCheckItem}
                        onChangeCounter={handleChangeQuantity}
                        onClickRemove={handleRemoveItem}
                      />
                    ))) || (
                    <StatusMessage status="empty">텅! 장바구니에 담은 상품이 없어요!</StatusMessage>
                  )}
                </Case.Success>

                <Case.Loading>
                  <StatusMessage status="loading">장바구니 목록을 불러오고 있습니다.</StatusMessage>
                </Case.Loading>

                <Case.Error>
                  <StatusMessage status="error">{errorMessage}</StatusMessage>
                </Case.Error>
              </SwitchAsync>
            </FlexContainer>
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
