import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCheckBox } from 'hooks';

import Layout from 'components/Layout';
import CartList from 'components/CartList';
import CartReceipt from 'components/CartReceipt';
import { snackbar } from 'actions/snackbar';
import { deleteCartItem, modifyCartItemCount } from 'actions/cart';
import { COLORS } from 'styles/theme';

import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const Cart = () => {
  const { items: cartList } = useSelector((state) => state.cart);
  const {
    checkedList,
    selectAllChecked,
    handleChecked,
    isChecked,
    checkAllSelectButton,
    deleteSelectedItem,
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

  const handleDeleteSelectedItem = () => {
    dispatch(deleteCartItem(checkedList));
    dispatch(snackbar.pushMessageSnackbar('삭제했습니다! 다음에 구매해주세요 😊'));
    deleteSelectedItem();
  };

  const handleItemCount = (productId, count) => {
    dispatch(modifyCartItemCount(productId, count));
  };

  return (
    <Layout>
      <Styled.CartListContainer>
        <CommonStyled.PageTitle>장바구니</CommonStyled.PageTitle>
        <CommonStyled.HR color={COLORS.BLACK} />
        <CommonStyled.FlexWrapper alignItems="flex-start">
          <CommonStyled.FlexWrapper margin="2rem" flexDirection="column" alignItems="flex-start">
            <CartList
              cartList={cartList}
              selectAllChecked={selectAllChecked}
              checkAllSelectButton={checkAllSelectButton}
              handleDeleteSelectedItem={handleDeleteSelectedItem}
              isChecked={isChecked}
              handleChecked={handleChecked}
              handleItemCount={handleItemCount}
            />
          </CommonStyled.FlexWrapper>
          <CartReceipt totalPrice={totalPrice} checkedListCount={checkedList.length} />
        </CommonStyled.FlexWrapper>
      </Styled.CartListContainer>
    </Layout>
  );
};

export default Cart;
