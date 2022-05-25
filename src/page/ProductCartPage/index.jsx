import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

import CheckBox from 'component/common/CheckBox';
import ContentBox from 'component/common/ContentBox';
import CartItem from 'component/CartItem';
import ErrorPendingBoundary from 'component/common/ErrorPendingBoundary';

import NotFoundPage from 'page/NotFoundPage';
import * as S from 'page/ProductCartPage/style';

import useCartItem from 'hook/useCartItem';
import useSelectedItem from 'hook/useSelectedItem';

export default function ProductCartPage() {
  const cartItem = useSelector((state) => state.cartReducer.cart);
  const error = useSelector((state) => state.cartReducer.error);
  const pending = useSelector((state) => state.cartReducer.pending);
  const selectedItem = useSelector((state) => state.selectedItemReducer.selectedItem);

  const {initializeCart, deleteSelectedCart} = useCartItem();

  const {selectAllItem, unselectAllItem} = useSelectedItem();

  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  const selectedCartItem = cartItem.filter(({id}) => selectedItem.includes(id));

  const {totalQuantity, totalPrice} = selectedCartItem.reduce(
    (prev, cur) => {
      return {
        totalQuantity: cur.quantity + prev.totalQuantity,
        totalPrice: cur.price * cur.quantity + prev.totalPrice,
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
            <ErrorPendingBoundary
              error={error}
              pending={pending}
              fallback={<NotFoundPage>에러가 발생했어요.</NotFoundPage>}
            >
              {cartItem.map((cartInfo) => {
                const initialChecked = selectedItem.includes(cartInfo.id);
                return (
                  <React.Fragment key={cartInfo.id}>
                    <CartItem cartInfo={cartInfo} initialChecked={initialChecked} />
                    <hr />
                  </React.Fragment>
                );
              })}
            </ErrorPendingBoundary>
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
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
};
