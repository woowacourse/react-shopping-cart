import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

import CheckBox from 'component/common/CheckBox';
import ContentBox from 'component/ContentBox';
import CartItem from 'component/CartItem';

import * as S from 'page/ProductCartPage/style';

import useCartItem from 'hook/useCartItem';
import useSelectedItem from 'hook/useSelectedItem';

export default function ProductCartPage() {
  const cartItem = useSelector((state) => state.cartReducer.cart);
  const selectedItem = useSelector((state) => state.selectedItemReducer.selectedItem);

  const {deleteCartItem, increaseQuantity, decreaseQuantity, deleteSelectedCart} = useCartItem();
  const {selectAllItem, unselectAllItem, addSelectedItem, deleteSelectedItem} = useSelectedItem();

  const selectedCartItem = cartItem.filter(({id}) => selectedItem.includes(id));

  const {totalQuantity, totalPrice} = selectedCartItem.reduce(
    (prev, cur) => {
      return {
        totalQuantity: cur.quantity + prev.totalQuantity,
        totalPrice: cur.itemPrice * cur.quantity + prev.totalPrice,
      };
    },
    {totalQuantity: 0, totalPrice: 0},
  );

  const isAllChecked = cartItem.length === selectedItem.length && selectedItem.length > 0;

  return (
    <S.ProductCartPageLayout>
      <S.HeaderSpan>장바구니</S.HeaderSpan>
      <S.CartInfoBox>
        <S.SelectCartBox>
          <S.SelectDeleteRow>
            <S.CheckBoxRow>
              <CheckBox
                initialChecked={isAllChecked}
                handleCheckedTrue={() => selectAllItem(cartItem)}
                handleCheckedFalse={unselectAllItem}
              />
              {isAllChecked ? '선택해제' : '전체선택'}
            </S.CheckBoxRow>
            <S.DeleteButton onClick={() => deleteSelectedCart(selectedItem)}>
              상품삭제
            </S.DeleteButton>
          </S.SelectDeleteRow>

          <S.ListHeaderSpan>장바구니 상품 ({cartItem.length}개)</S.ListHeaderSpan>
          <S.CartListBox>
            {cartItem.map(({itemImgURL, itemName, itemPrice, quantity, id}) => {
              const initialChecked = selectedItem.includes(id);
              return (
                <React.Fragment key={id}>
                  <CartItem
                    initialChecked={initialChecked}
                    itemImgURL={itemImgURL}
                    itemName={itemName}
                    itemPrice={itemPrice}
                    quantity={quantity}
                    id={id}
                    handleDeleteIconClick={() => deleteCartItem(id)}
                    handleCheckedTrue={addSelectedItem}
                    handleCheckedFalse={deleteSelectedItem}
                    handleIncrease={increaseQuantity}
                    handleDecrease={decreaseQuantity}
                  />
                  <hr />
                </React.Fragment>
              );
            })}
          </S.CartListBox>
        </S.SelectCartBox>

        <ContentBox
          headerText="결제예상금액"
          leftContent="결제예상금액"
          rightContent={`${totalPrice.toLocaleString()}원`}
          buttonText={`주문하기 (${totalQuantity}개)`}
        />
      </S.CartInfoBox>
    </S.ProductCartPageLayout>
  );
}

ProductCartPage.propTypes = {
  itemImgURL: PropTypes.string,
  itemName: PropTypes.string,
  itemPrice: PropTypes.string,
};
