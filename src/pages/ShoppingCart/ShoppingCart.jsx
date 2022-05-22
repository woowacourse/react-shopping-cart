import styled from 'styled-components';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ACTION_TYPE from 'redux/cart/cartActions';

import { Button } from 'components/@common';
import { CartProduct, PageLayout, Result, Selector } from 'components';

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

const ProductDeleteButton = styled.div`
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
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setChecked(products.length === checkedProducts.length);
  }, [products, checkedProducts]);

  const onChangeAllSelector = ({ target }) => {
    dispatch({
      type: ACTION_TYPE.TOGGLE_ALL_CART_PRODUCTS_CHECK,
      payload: { checked: target.checked },
    });
    setChecked(prevChecked => !prevChecked);
  };

  return (
    <PageLayout header="장바구니">
      <ShoppingCartBox>
        <div>
          <SelectorBox>
            <Selector label="전체" onChange={onChangeAllSelector} checked={checked} />
            <Button>
              <ProductDeleteButton>선택삭제</ProductDeleteButton>
            </Button>
          </SelectorBox>
          <ProductListHeader>든든배송 상품 ({products.length}개)</ProductListHeader>
          <DivisionLine />
          {products.map(product => (
            <CartProduct key={`cart${product.id}`} {...product} />
          ))}
        </div>
        <Result title="결제예상금액" price={0} button={`주문하기(${checkedProducts.length}개)`} />
      </ShoppingCartBox>
    </PageLayout>
  );
}

export default ShoppingCart;
