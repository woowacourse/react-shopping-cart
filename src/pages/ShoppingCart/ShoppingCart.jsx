import * as S from './ShoppingCart.styles';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ACTION_TYPE from 'redux/cart/cartActions';

import { Button } from 'components/@common';
import { CartProduct, PageLayout, Result, Selector } from 'components';

import { getObjectArrayIdxOfValue } from 'utils';

function ShoppingCart() {
  const { products, checkedProducts } = useSelector(store => store.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const total = checkedProducts.map(({ id }) => {
      const productIdx = getObjectArrayIdxOfValue(products, { key: 'id', value: id });
      const { quantity, price } = products[productIdx];

      return quantity * price;
    });

    setTotalPrice(total.reduce((acc, cur) => acc + cur, 0));
    setChecked(products.length === checkedProducts.length);
  }, [products, checkedProducts]);

  const onChangeAllSelector = ({ target }) => {
    dispatch({
      type: ACTION_TYPE.TOGGLE_ALL_CART_PRODUCTS_CHECK,
      payload: { checked: target.checked },
    });
    setChecked(prevChecked => !prevChecked);
  };

  const onClickSelectDeleteButton = () => {
    if (!checkedProducts.length) return;

    dispatch({ type: ACTION_TYPE.REMOVE_SELECTED_PRODUCTS_FROM_CART });
  };

  return (
    <PageLayout header="장바구니">
      <S.ShoppingCart>
        <div>
          <S.SelectorBox>
            <Selector label="전체" onChange={onChangeAllSelector} checked={checked} />
            <Button onClick={onClickSelectDeleteButton}>
              <S.SelectDeleteButton>선택삭제</S.SelectDeleteButton>
            </Button>
          </S.SelectorBox>
          <S.ProductListHeader>든든배송 상품 ({products.length}개)</S.ProductListHeader>
          <S.DivisionLine />
          {products.map(product => (
            <CartProduct key={`cart${product.id}`} {...product} />
          ))}
        </div>
        <Result
          title="결제예상금액"
          price={totalPrice}
          button={`주문하기(${checkedProducts.length}개)`}
        />
      </S.ShoppingCart>
    </PageLayout>
  );
}

export default ShoppingCart;
