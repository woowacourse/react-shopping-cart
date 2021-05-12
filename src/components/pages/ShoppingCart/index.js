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
} from './index.styles';
import { useSelector, useDispatch } from 'react-redux';
import { PRODUCTS, ROUTE } from '../../../constants';
import { formatPrice, getTotalPrice, getTotalQuantity } from '../../../utils';
import { useHistory } from 'react-router-dom';

const ShoppingCart = () => {
  const products = Object.values(
    useSelector(({ product }) => product.pickedProducts)
  );

  const dispatch = useDispatch();

  const handleIncreaseQuantity = id => {
    dispatch({ type: PRODUCTS.INCREASE_QUANTITY, id });
  };

  const handleDecreaseQuantity = id => {
    dispatch({ type: PRODUCTS.DECREASE_QUANTITY, id });
  };

  const getTotalQuantityText = products => {
    const totalQuantity = getTotalQuantity(products);

    if (totalQuantity === 0) {
      return '상품 담으러 가기';
    }

    return `주문하기 (${totalQuantity}개)`;
  };

  const history = useHistory();

  const handlePaymentSheetButtonClick = () => {
    if (products.length > 0) {
      history.push(ROUTE.ORDER_PAYMENT);

      return;
    }

    history.push(ROUTE.PRODUCTS);
  };

  const handleCheckBoxClick = id => {
    dispatch({ type: PRODUCTS.TOGGLE_CHECKED, id });
  };

  const isCheckedAll = products.every(({ isChecked }) => isChecked);

  const handleEntireCheckBoxClick = () => {
    dispatch({ type: PRODUCTS.TOGGLE_ENTIRE_CHECKED, isChecked: isCheckedAll });
  };

  const handleDeleteButtonClick = id => {
    dispatch({ type: PRODUCTS.DELETE, id });
  };

  const handleCheckedDeleteButton = () => {
    dispatch({ type: PRODUCTS.DELETE_CHECKED });
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
                onCheckBoxClick={handleEntireCheckBoxClick}
              />
              <span>
                전체선택{' '}
                {`(${products.filter(({ isChecked }) => isChecked).length}/${
                  products.length
                })`}
              </span>
            </CheckBoxWrapper>
            <Button onClick={handleCheckedDeleteButton}>상품삭제</Button>
          </Controller>
          <ShoppingList>
            <div>배송 상품</div>
            <ul>
              {products.map(({ id, ...product }) => (
                <li key={id}>
                  <ShoppingItem
                    {...product}
                    onIncreaseQuantity={() => handleIncreaseQuantity(id)}
                    onDecreaseQuantity={() => handleDecreaseQuantity(id)}
                    onCheckBoxClick={() => handleCheckBoxClick(id)}
                    onDeleteButtonClick={() => handleDeleteButtonClick(id)}
                  />
                </li>
              ))}
            </ul>
          </ShoppingList>
        </div>
        <PaymentSheet
          title="결제예상금액"
          priceInfo="결제예상금액"
          price={formatPrice(getTotalPrice(products))}
          buttonText={`${getTotalQuantityText(products)}`}
          onButtonClick={handlePaymentSheetButtonClick}
        />
      </Main>
    </Page>
  );
};

export default ShoppingCart;
