import axios from 'axios';
import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { ACTION_TYPE, ROUTE } from '../../../constants';
import { formatPrice, getTotalPrice, getTotalQuantity } from '../../../utils';
import { useHistory } from 'react-router-dom';
import {
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  fetchCarts,
} from './index.actions';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.product.product.cartItems);
  useEffect(() => {
    if (cartItems.length === 0) {
      fetchCarts()(dispatch);
    }
  }, []);
  const getTotalQuantityText = () => {
    const totalQuantity = getTotalQuantity(cartItems);

    if (totalQuantity === 0) {
      return '상품을 담아주세요🤍';
    }

    return `주문하기 (${totalQuantity}개)`;
  };

  const history = useHistory();
  const handlePaymentSheetButtonClick = () => {
    if (cartItems.length > 0) {
      history.push(ROUTE.ORDER_PAYMENT);

      return;
    }

    history.push(ROUTE.PRODUCTS);
  };

  const isCheckedAll = cartItems.every(({ isChecked }) => isChecked);

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
      try {
        const cartItem = cartItems.find(item => item.product_id === id);
        const index = cartItems.findIndex(item => item.product_id === id);

        axios.delete(`/api/customers/ddongule/carts/${cartItem.cart_id}`);
        dispatch({ type: ACTION_TYPE.PRODUCTS.DELETE, index });
      } catch (error) {
        console.error(error);
      }

      return;
    }

    const deleteProducts = cartItems.filter(item => item.isChecked);

    deleteProducts.forEach(product => {
      try {
        axios.delete(`/api/customers/ddongule/carts/${product.cart_id}`);
      } catch (error) {
        console.error(error);
      }
    });

    dispatch({
      type: ACTION_TYPE.PRODUCTS.DELETE_CHECKED,
    });
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
                전체선택
                {`${cartItems.filter(({ isChecked }) => isChecked).length}/${
                  cartItems.length
                }`}
              </span>
            </CheckBoxWrapper>
            <Button onClick={() => handleDeleteButtonClick()}>상품삭제</Button>
          </Controller>
          <ShoppingList>
            <div>배송 상품</div>
            <ul>
              {Object.values(cartItems).map(({ product_id, ...product }) => (
                <li key={product_id}>
                  <ShoppingItem
                    {...product}
                    onIncreaseQuantity={() =>
                      handleIncreaseQuantity(cartItems, product_id)(dispatch)
                    }
                    onDecreaseQuantity={() =>
                      handleDecreaseQuantity(cartItems, product_id)(dispatch)
                    }
                    onCheckBoxClick={() => handleCheckBoxClick(product_id)}
                    onDeleteButtonClick={() =>
                      handleDeleteButtonClick(product_id)
                    }
                  />
                </li>
              ))}
            </ul>
          </ShoppingList>
        </div>
        <PaymentSheet
          title="결제예상금액"
          priceInfo="결제예상금액"
          price={formatPrice(getTotalPrice(cartItems))}
          buttonText={`${getTotalQuantityText()}`}
          onButtonClick={handlePaymentSheetButtonClick}
        />
      </Main>
    </Page>
  );
  // );
};

export default ShoppingCart;
