import React from 'react';
import PageHeader from '../../PageHeader';
import PaymentSheet from '../../PaymentSheet';
import ShoppingItem from '../../ShoppingItem';
import CheckBox from '../../common/CheckBox';
import Button from '../../common/Button';
import {
  Main,
  Page,
  Controller,
  CheckBoxWrapper,
  ShoppingList,
  Empty,
} from './index.styles';
import { formatPrice, getTotalPrice, getTotalQuantity } from '../../../utils';
import { useCart } from '../../../hooks';

const ShoppingCart = () => {
  const {
    products,
    checkedProducts,
    isCheckedAll,
    toggleChecked,
    toggleCheckedAll,
  } = useCart();
  // const handlePaymentSheetButtonClick = () => {
  //   if (products.some(({ isChecked }) => isChecked)) {
  //     history.push(ROUTE.ORDER_PAYMENT);

  //     return;
  //   }

  //   alert(MESSAGE.CART.CHECK_PRODUCT_REQUEST);
  // };

  return (
    <Page>
      <PageHeader>장바구니</PageHeader>
      <Main>
        <div>
          <Controller>
            <CheckBoxWrapper>
              <CheckBox
                onCheckBoxClick={toggleCheckedAll}
                isChecked={isCheckedAll}
              />
              <span>
                전체선택 {`(${checkedProducts.length}/${products.length})`}
              </span>
            </CheckBoxWrapper>
            <Button>상품삭제</Button>
          </Controller>
          <ShoppingList>
            <div>배송 상품</div>
            {products.length > 0 ? (
              <ul>
                {products.map(product => (
                  <ShoppingItem
                    key={product.product_id}
                    {...product}
                    onCheckBoxClick={() =>
                      toggleChecked(product.product_id, product.isChecked)
                    }
                  />
                ))}
              </ul>
            ) : (
              <Empty>장바구니에 상품이 존재하지 않습니다.</Empty>
            )}
          </ShoppingList>
        </div>
        <PaymentSheet
          title="결제예상금액"
          priceInfo="결제예상금액"
          price={formatPrice(getTotalPrice(products))}
          buttonText={`주문하기 (${getTotalQuantity(products)}개)`}
        />
      </Main>
    </Page>
  );
};

export default ShoppingCart;
