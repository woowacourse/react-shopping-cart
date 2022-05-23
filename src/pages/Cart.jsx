import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCheckBox, useCartItem } from 'hooks';

import Layout from 'components/Layout';
import PageHeader from 'components/@common/PageHeader';
import CartList from 'components/CartList';
import CartReceipt from 'components/CartReceipt';
import { snackbar } from 'actions/snackbar';
import { deleteCartItem, modifyCartItemCount } from 'actions/cart';

import { 알림_메시지 } from 'constants/';
import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const Cart = () => {
  const cartList = useCartItem();
  const {
    checkedList,
    selectAllChecked,
    handleChecked,
    isChecked,
    checkAllSelectButton,
    clearCheckBoxItems,
  } = useCheckBox(cartList);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    let calculateTotalPrice = 0;

    checkedList.forEach((productId) => {
      const currentProduct = cartList.find((checkedProduct) => checkedProduct.id === productId);
      calculateTotalPrice += currentProduct.price * currentProduct.count;
    });

    setTotalPrice(calculateTotalPrice);
  }, [cartList, checkedList]);

  const deleteSelectedItem = () => {
    if (checkedList.length <= 0) {
      return;
    }

    dispatch(deleteCartItem(checkedList));
    clearCheckBoxItems();
    dispatch(snackbar.pushMessageSnackbar(알림_메시지.장바구니_다중_삭제));
  };

  const handleItemCount = (productId, count) => {
    dispatch(modifyCartItemCount(productId, count));
  };

  return (
    <Layout>
      <Styled.CartListContainer>
        <PageHeader pageTitle="장바구니" />
        <CommonStyled.FlexWrapper alignItems="flex-start">
          <CommonStyled.FlexWrapper margin="2rem" flexDirection="column" alignItems="flex-start">
            <CartList
              cartList={cartList}
              selectAllChecked={selectAllChecked}
              checkedListCount={checkedList.length}
              checkAllSelectButton={() => checkAllSelectButton}
              deleteSelectedItem={() => deleteSelectedItem}
              isChecked={isChecked}
              handleChecked={() => handleChecked}
              handleItemCount={() => handleItemCount}
            />
          </CommonStyled.FlexWrapper>
          <CartReceipt totalPrice={totalPrice} checkedListCount={checkedList.length} />
        </CommonStyled.FlexWrapper>
      </Styled.CartListContainer>
    </Layout>
  );
};

export default Cart;
