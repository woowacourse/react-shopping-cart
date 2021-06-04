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
import { useSelector, useDispatch } from 'react-redux';
import { ACTION_TYPE, MESSAGE, ROUTE } from '../../../constants';
import { formatPrice, getTotalPrice, getTotalQuantity } from '../../../utils';
import { useHistory } from 'react-router-dom';

const ShoppingCart = () => {
  const products = useSelector(({ cart }) => cart);

  const dispatch = useDispatch();

  const handleIncreaseQuantity = id => {
    dispatch({ type: ACTION_TYPE.PRODUCTS.INCREASE_QUANTITY, id });
  };

  const handleDecreaseQuantity = id => {
    dispatch({ type: ACTION_TYPE.PRODUCTS.DECREASE_QUANTITY, id });
  };

  const history = useHistory();

  const handlePaymentSheetButtonClick = () => {
    if (products.some(({ isChecked }) => isChecked)) {
      history.push(ROUTE.ORDER_PAYMENT);

      return;
    }

    alert(MESSAGE.CART.CHECK_PRODUCT_REQUEST);
  };

  const isCheckedAll = products.every(({ isChecked }) => isChecked);

  const handleCheckBoxClick = id => {
    if (id) {
      dispatch({ type: ACTION_TYPE.PRODUCTS.TOGGLE_CHECKED, id });

      return;
    }

    dispatch({
      type: ACTION_TYPE.PRODUCTS.TOGGLE_ENTIRE_CHECKED,
      isChecked: isCheckedAll,
    });
  };

  const handleDeleteButtonClick = id => {
    if (id) {
      dispatch({ type: ACTION_TYPE.PRODUCTS.DELETE, id });

      return;
    }

    dispatch({ type: ACTION_TYPE.PRODUCTS.DELETE_CHECKED });
  };

  return (
    <Page>
      <PageHeader>장바구니</PageHeader>
      <Main>
        <div>
          <Controller>
            <CheckBoxWrapper>
              <CheckBox
                isChecked={isCheckedAll}
                onCheckBoxClick={() => handleCheckBoxClick()}
              />
              <span>
                전체선택{' '}
                {`(${products.filter(({ isChecked }) => isChecked).length}/${
                  products.length
                })`}
              </span>
            </CheckBoxWrapper>
            <Button onClick={() => handleDeleteButtonClick()}>상품삭제</Button>
          </Controller>
          <ShoppingList>
            <div>배송 상품</div>
            {products.length > 0 ? (
              <ul>
                {products.map(product => (
                  <ShoppingItem key={product.product_id} {...product} />
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
          onButtonClick={handlePaymentSheetButtonClick}
        />
      </Main>
    </Page>
  );
};

export default ShoppingCart;
