import styled from 'styled-components';

import { useSelector } from 'react-redux';

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
  const { products } = useSelector(store => store.cart);

  return (
    <PageLayout header="장바구니">
      <ShoppingCartBox>
        <div>
          <SelectorBox>
            <Selector label="전체" />
            <Button>
              <ProductDeleteButton>선택삭제</ProductDeleteButton>
            </Button>
          </SelectorBox>
          <ProductListHeader>든든배송 상품 ({cartProducts.length}개)</ProductListHeader>
          <DivisionLine />
          {products.map(product => (
            <CartProduct key={`cart${product.id}`} {...product} />
          ))}
        </div>
        <Result title="결제예상금액" price={0} button={`주문하기(개)`} />
      </ShoppingCartBox>
    </PageLayout>
  );
}

export default ShoppingCart;
