import useCart from 'hooks/useCart';

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
  const { action, state } = useCart();
  const { cartItems, isLoading, isLoaded, error, checkedItemList } = state;
  const { updateItem, updateItemChecked, removeItem, removeItemList } = action;

  const isSelectAllChecked = checkedItemList.length > 0;

  const handleCheckItem = (id, isChecked) => {
    updateItemChecked(id, isChecked);
  };

  const handleChangeQuantity = (id, quantity) => {
    updateItem(id, { quantity }).then((status) => {
      status === false && alert('서버 오류로 인해 상품 정보 갱신에 실패하였습니다.');
    });
  };

  const handleRemoveItem = (id) => {
    if (!confirm('정말 해당 상품을 장바구니에서 제거하시겠습니까?')) {
      return;
    }

    removeItem(id).then((status) => {
      status ? alert('상품이 제거되었습니다.') : alert('상품 제거에 실패하였습니다.');
    });
  };

  const handleRemoveItemList = () => {
    if (!confirm('정말 선택한 상품을 모두 제거하시겠습니까?')) {
      return;
    }

    const checkedIdList = checkedItemList.map(({ id }) => id);

    removeItemList(checkedIdList).then((status) => {
      status ? alert('상품이 제거되었습니다.') : alert('상품 제거에 실패하였습니다.');
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
            <Checkbox size="medium" checked={isSelectAllChecked}>
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
              {isLoaded &&
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
                ))}
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
              <TextUnderline>21,700원</TextUnderline>
            </FlexContainer>

            <FlexContainer>
              <Button state="primary">주문하기 (2개)</Button>
            </FlexContainer>
          </S.OrderContainer>
        </FlexContainer>
      </S.Container>
    </>
  );
}
export default CartList;
