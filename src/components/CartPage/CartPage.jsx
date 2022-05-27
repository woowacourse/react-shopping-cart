import styled from 'styled-components';
import CartHeader from 'components/CartPage/CartHeader';
import CartProduct from 'components/CartPage/CartProduct';
import Order from 'components/CartPage/Order';
import CheckBox from 'components/CartPage/CheckBox';
import { DivideUnderLine, DefaultButton } from 'components/shared/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart, updateCart } from 'store/carts/action';
import { ERROR_MESSAGE, NOTICE } from 'constants';
import { getCheckedCarts } from 'utils';

function CartPage() {
  const { carts } = useSelector((state) => state.carts);

  const dispatch = useDispatch();

  const selectAll = (isChecked) => {
    carts
      .filter((cart) => cart.checked === isChecked)
      .forEach((filteredCart) => {
        dispatch(updateCart({ ...filteredCart, checked: !isChecked }));
      });
  };

  const deleteCheckedProducts = () => {
    if (getCheckedCarts(carts).length) {
      if (window.confirm(NOTICE.DELETE_CONFIRM)) {
        carts.forEach((product) => {
          dispatch(deleteCart(product.id));
        });
      }
      return;
    }
    alert(ERROR_MESSAGE.NON_SELECTED);
  };

  return (
    <Styled.CartSection>
      <CartHeader />
      <Styled.CartBody>
        <Styled.CartLeftSection>
          <Styled.CartSelectorWrapper>
            <Styled.CheckBoxContainer>
              <CheckBox
                checked={carts.length === getCheckedCarts(carts).length}
                onChange={selectAll}
              />
              <Styled.CancelSelectLabel htmlFor="checkbox">
                선택해제
              </Styled.CancelSelectLabel>
            </Styled.CheckBoxContainer>
            <Styled.DeleteProductButton onClick={deleteCheckedProducts}>
              상품삭제
            </Styled.DeleteProductButton>
          </Styled.CartSelectorWrapper>
          <Styled.CartListTitle>{`돔하디배송 상품(${carts.length}개)`}</Styled.CartListTitle>
          <Styled.CartDivideLine shape="greyThick" />
          {carts.map((product) => (
            <React.Fragment key={product.id}>
              <CartProduct product={product} />
              <Styled.CartDivideLine shape="greyThin" />
            </React.Fragment>
          ))}
        </Styled.CartLeftSection>
        <Order />
      </Styled.CartBody>
    </Styled.CartSection>
  );
}

export default CartPage;

const Styled = {
  CartSection: styled.section`
    padding: 24px 300px;
    min-width: 1500px;
  `,
  CartBody: styled.div`
    display: flex;
  `,
  CartLeftSection: styled.section`
    width: 60%;
    margin-top: 50px;
  `,
  CartSelectorWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 26px;
  `,
  CheckBoxContainer: styled.div`
    display: flex;
    align-items: center;
  `,
  CancelSelectLabel: styled.label`
    padding-left: 7px;
  `,
  DeleteProductButton: styled(DefaultButton)`
    padding: 12px 22px;
    border: 1px solid #bbbbbb;
    background-color: white;
  `,
  CartListTitle: styled.h3`
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 400;
  `,
  CartDivideLine: styled(DivideUnderLine)`
    margin-top: 10px;
    ${({ shape }) => {
      switch (shape) {
        case 'blackThick':
          return 'border: 2px solid black;';
        case 'greyThick':
          return 'border: 2px solid #aaaaaa;';
        case 'greyThin':
        default:
          return 'border: 1px solid #cccccc;';
      }
    }}
  `,
};
