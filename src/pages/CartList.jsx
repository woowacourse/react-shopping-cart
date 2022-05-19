import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCheckBox } from 'hooks';

import CartProducItem from 'components/CartProductItem';
import Layout from 'components/Layout';
import Button from 'components/@common/Button/styles';
import CheckBox from 'components/@common/CheckBox';
import { snackbar } from 'actions/snackbar';
import { deleteCartItem, modifyCartItemCount } from 'actions/cart';
import { COLORS } from 'styles/theme';

import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const CartList = () => {
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
            <CommonStyled.FlexWrapper justifyContent="space-between" margin="1rem 0 2rem 0">
              <CheckBox checkState={selectAllChecked} handleChecked={() => checkAllSelectButton()}>
                {selectAllChecked ? '선택해제' : '전체선택'}
              </CheckBox>
              <Button
                width="7rem"
                height="40px"
                margin="0"
                size="1rem"
                weight="normal"
                onClick={() => handleDeleteSelectedItem()}
              >
                상품삭제
              </Button>
            </CommonStyled.FlexWrapper>
            <p>싱싱배송 상품 ({cartList.length}종)</p>
            <CommonStyled.HR />
            {cartList &&
              cartList.map(({ id, name, thumbnail, price, count }) => (
                <>
                  <CartProducItem
                    key={id}
                    id={id}
                    name={name}
                    thumbnail={thumbnail}
                    price={price}
                    count={count}
                    isChecked={isChecked(id)}
                    handleChecked={() => handleChecked(id)}
                    handleItemCount={handleItemCount}
                  />
                  <CommonStyled.HR size="1px" />
                </>
              ))}
          </CommonStyled.FlexWrapper>
          <Styled.CartListReceiptContainer>
            <CommonStyled.FlexWrapper padding="1.5rem">
              <CommonStyled.Text>결제예상금액</CommonStyled.Text>
            </CommonStyled.FlexWrapper>
            <CommonStyled.HR margin="0" />
            <CommonStyled.FlexWrapper flexDirection="column" padding="1.5rem">
              <CommonStyled.FlexWrapper justifyContent="space-between">
                <CommonStyled.Text weight="bold" size="0.8rem">
                  결제예상금액
                </CommonStyled.Text>
                <CommonStyled.Text weight="bold" size="0.8rem">
                  {totalPrice.toLocaleString('ko-KR')}원
                </CommonStyled.Text>
              </CommonStyled.FlexWrapper>
              <Button height="60px" margin="3rem 0 0 0" size="1.2rem" weight="normal">
                주문하기({checkedList.length}종)
              </Button>
            </CommonStyled.FlexWrapper>
          </Styled.CartListReceiptContainer>
        </CommonStyled.FlexWrapper>
      </Styled.CartListContainer>
    </Layout>
  );
};

export default CartList;
