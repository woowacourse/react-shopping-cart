import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';

import CheckBox from 'component/common/CheckBox';
import ContentBox from 'component/ContentBox';
import CartItem from 'component/CartItem';

import * as S from 'page/ProductCartPage/style';
import useCartItem from 'hook/useCartItem';
import {SELECTED_ITEM} from 'store/modules/selectedItem';

export default function ProductCartPage() {
  const cartItem = useSelector((state) => state.cartReducer.cart);
  const selectedItem = useSelector((state) => state.selectedItemReducer.selectedItem);
  const {deleteCartItem} = useCartItem();
  const dispatch = useDispatch();

  const selectedCartItem = cartItem.filter(({id}) => selectedItem.includes(id));

  const {totalCount, totalPrice} = selectedCartItem.reduce(
    (prev, cur) => {
      return {
        totalCount: cur.count + prev.totalCount,
        totalPrice: cur.itemPrice * cur.count + prev.totalPrice,
      };
    },
    {totalCount: 0, totalPrice: 0},
  );

  const handleCheckedTrue = (id) => {
    dispatch({type: SELECTED_ITEM.ADD, payload: Number(id)});
  };

  const handleCheckedFalse = (id) => {
    dispatch({type: SELECTED_ITEM.DELETE, payload: Number(id)});
  };

  return (
    <S.ProductCartPageLayout>
      <S.HeaderSpan>장바구니</S.HeaderSpan>
      <S.CartInfoBox>
        <S.SelectCartBox>
          <S.SelectDeleteRow>
            <S.CheckBoxRow>
              <CheckBox />
              선택해제
            </S.CheckBoxRow>
            <S.DeleteButton>상품삭제</S.DeleteButton>
          </S.SelectDeleteRow>

          <S.ListHeaderSpan>장바구니 상품 (개)</S.ListHeaderSpan>
          <S.CartListBox>
            {cartItem.map(({itemImgURL, itemName, itemPrice, count, id}) => {
              const initialChecked = selectedItem.includes(id);
              return (
                <React.Fragment key={id}>
                  <CartItem
                    initialChecked={initialChecked}
                    itemImgURL={itemImgURL}
                    itemName={itemName}
                    itemPrice={itemPrice}
                    count={count}
                    id={id}
                    handleDeleteIconClick={() => {
                      deleteCartItem(id);
                    }}
                    handleCheckedTrue={handleCheckedTrue}
                    handleCheckedFalse={handleCheckedFalse}
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
          buttonText={`주문하기 (${totalCount}개)`}
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
