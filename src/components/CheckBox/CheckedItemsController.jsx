import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { checkAll, loadCarts, uncheckAll } from 'store/carts';

import { BasicButton, Flex } from 'components/shared/basics';
import CheckBox from 'components/CheckBox/CheckBox';

import useDeleteProductFromCart from 'hooks/useDeleteProductFromCart';

function CheckedItemsController({ checkedCarts, allChecked }) {
  const deleteCarts = checkedCarts.map((cart) => cart.id).join('&');
  const { deleteFromCart } = useDeleteProductFromCart(deleteCarts);

  const dispatch = useDispatch();

  const handleCheckAllProducts = () => {
    dispatch(checkAll());
  };

  const handleUncheckAllProducts = () => {
    dispatch(uncheckAll());
  };

  const handleCheckedProductsDelete = () => {
    if (!checkedCarts.length) {
      return;
    }

    if (!window.confirm('선택된 상품을 삭제하시겠습니까?')) {
      return;
    }

    deleteFromCart();
    dispatch(loadCarts());
  };

  return (
    <Style.CheckBoxFlexContainer justify="space-between" align="center">
      <Flex align="center">
        <CheckBox
          checked={allChecked}
          onCheck={handleCheckAllProducts}
          onUncheck={handleUncheckAllProducts}
        />
        <Style.CheckBoxLabel>전체선택</Style.CheckBoxLabel>
      </Flex>
      <Style.DeleteButton onClick={handleCheckedProductsDelete} type="button">
        상품삭제
      </Style.DeleteButton>
    </Style.CheckBoxFlexContainer>
  );
}

export default CheckedItemsController;

const Style = {
  CheckBoxFlexContainer: styled(Flex)`
    margin: 20px 0;
  `,
  DeleteButton: styled(BasicButton)`
    padding: 12px 22px;
    border: 1px solid #bbbbbb;
  `,
  CheckBoxLabel: styled.span`
    padding-left: 7px;
  `,
  CartTitle: styled.h3`
    display: flex;
    align-items: center;
    font-size: 20px;
  `,
};
