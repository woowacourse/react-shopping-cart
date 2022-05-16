import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

import CheckBox from 'component/common/CheckBox';
import Button from 'component/common/Button';
import AmountBox from 'component/AmountBox';
import CartItem from 'component/CartItem';

import * as S from 'page/ProductCartPage/style';

export default function ProductCartPage() {
  const cartItem = useSelector((state) => state.cartReducer.cart);

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
      <S.HeaederSpan>장바구니</S.HeaederSpan>
      <S.CartInfoBox>
        <S.SelectCartBox>
          <S.SelectDeleteRow>
            <S.CheckBoxRow>
              <CheckBox id="check" />
              선택해제
            </S.CheckBoxRow>
            <Button>상품삭제</Button>
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
                />
                <hr />
              </React.Fragment>
            ))}
          </S.CartListBox>
        </S.SelectCartBox>

        <AmountBox type="expect" totalCount={totalCount} totalPrice={totalPrice} />
      </S.CartInfoBox>
    </S.ProductCartPageLayout>
  );
}

ProductCartPage.propTypes = {
  itemImgURL: PropTypes.string,
  itemName: PropTypes.string,
  itemPrice: PropTypes.string,
};
