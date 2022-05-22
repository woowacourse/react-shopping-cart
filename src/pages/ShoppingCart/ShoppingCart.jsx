import styled from 'styled-components';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ACTION_TYPE from 'redux/cart/cartActions';

import { Button } from 'components/@common';
import { CartProduct, PageLayout, Result, Selector } from 'components';

import { getObjectArrayIdxOfValue } from 'utils';

const ShoppingCartBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const SelectorBox = styled.div`
  width: 736px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 53px 0 26px;
`;

const SelectDeleteButton = styled.div`
  padding: 12px 22px;
  border: 1px solid #bbbbbb;
  font-size: 16px;
`;

const ProductListHeader = styled.span`
  font-weight: 400px;
  font-size: 20px;
`;

const DivisionLine = styled.hr`
  width: 736px;
  height: 4px;
  margin-top: 16px;
  border: 0;
  background: #aaaaaa;
`;

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
    dispatch({ type: ACTION_TYPE.REMOVE_SELECTED_PRODUCTS_FROM_CART });
  };

  return (
    <PageLayout header="장바구니">
      <ShoppingCartBox>
        <div>
          <SelectorBox>
            <Selector label="전체" onChange={onChangeAllSelector} checked={checked} />
            <Button onClick={onClickSelectDeleteButton}>
              <SelectDeleteButton>선택삭제</SelectDeleteButton>
            </Button>
          </SelectorBox>
          <ProductListHeader>든든배송 상품 ({products.length}개)</ProductListHeader>
          <DivisionLine />
          {products.map(product => (
            <CartProduct key={`cart${product.id}`} {...product} />
          ))}
        </div>
        <Result
          title="결제예상금액"
          price={totalPrice}
          button={`주문하기(${checkedProducts.length}개)`}
        />
      </ShoppingCartBox>
    </PageLayout>
  );
}

export default ShoppingCart;
