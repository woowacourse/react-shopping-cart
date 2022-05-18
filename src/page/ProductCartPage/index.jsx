import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

import CheckBox from 'component/common/CheckBox';
import ContentBox from 'component/ContentBox';
import CartItem from 'component/CartItem';

import * as S from 'page/ProductCartPage/style';
import useCartItem from 'hook/useCartItem';

export default function ProductCartPage() {
  const cartItem = useSelector((state) => state.cartReducer.cart);
  const {deleteCartItem} = useCartItem();

  const {totalCount, totalPrice} = cartItem.reduce(
    (prev, cur) => {
      return {
        totalCount: cur.count + prev.totalCount,
        totalPrice: cur.itemPrice * cur.count + prev.totalPrice,
      };
    },
    {totalCount: 0, totalPrice: 0},
  );

  return (
    <S.ProductCartPageLayout>
      <S.HeaderSpan>장바구니</S.HeaderSpan>
      <S.CartInfoBox>
        <S.SelectCartBox>
          <S.SelectDeleteRow>
            <S.CheckBoxRow>
              <CheckBox id="check" />
              선택해제
            </S.CheckBoxRow>
            <S.DeleteButton>상품삭제</S.DeleteButton>
          </S.SelectDeleteRow>

          <S.ListHeaderSpan>장바구니 상품 (개)</S.ListHeaderSpan>
          <S.CartListBox>
            {cartItem.map(({itemImgURL, itemName, itemPrice, count, id}) => (
              <React.Fragment key={id}>
                <CartItem
                  itemImgURL={itemImgURL}
                  itemName={itemName}
                  itemPrice={itemPrice}
                  count={count}
                  id={id}
                  handleDeleteIconClick={() => {
                    deleteCartItem(id);
                  }}
                />
                <hr />
              </React.Fragment>
            ))}
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
