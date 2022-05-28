import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import useCart from 'hooks/useCart';

import { Button, Checkbox, ToolTip } from 'components/@common';

import { ICON_CODE } from 'constants/';

import * as S from './styles';

function CartItemManage({ isAllChecked }) {
  const dispatch = useDispatch();
  const { cartAction, cartThunk, state } = useCart();
  const { checkedItemList, cartCurdAsyncState } = state;

  const handleAllCheckItem = () => {
    dispatch(cartAction.updateItemAllCheck(!isAllChecked));
  };

  const handleRemoveItemList = () => {
    if (!confirm('정말 선택한 상품을 모두 제거하시겠습니까?')) {
      return;
    }

    const checkedIdList = checkedItemList.map(({ id }) => id);

    dispatch(cartThunk.removeItemList(checkedIdList)).then(() => {
      cartCurdAsyncState.isLoaded
        ? alert('선택한 상품이 제거되었습니다.')
        : alert('선택한 상품 제거에 실패하였습니다.');
    });
  };

  return (
    <S.ItemManageContainer>
      <Checkbox size="medium" checked={isAllChecked} onChange={handleAllCheckItem}>
        {isAllChecked ? '선택 해제' : '전체 선택'}
      </Checkbox>

      <ToolTip text="선택한 상품을 장바구니에서 삭제합니다." align="bottom">
        <Button icon={ICON_CODE.TRASH} onClick={handleRemoveItemList}>
          선택 삭제
        </Button>
      </ToolTip>
    </S.ItemManageContainer>
  );
}

CartItemManage.defaultProps = {
  isAllChecked: PropTypes.bool,
};

CartItemManage.propTypes = {
  isAllChecked: PropTypes.bool,
};

export default CartItemManage;
