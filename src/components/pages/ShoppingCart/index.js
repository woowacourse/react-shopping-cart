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
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { PRODUCTS } from '../../../constants';
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

  const getButtonText = totalQuantity => {
    if (totalQuantity === 0) {
      return '상품 담기';
    }

    return `주문하기 (${totalQuantity}개)`;
  };

  const history = useHistory();

  const handlePaymentSheetButtonClick = () => {
    history.push('./order-payment');
  };

  return (
    <Page>
      <PageHeader>장바구니</PageHeader>
      <Main>
        <div>
          <Controller>
            <CheckBoxWrapper>
              <CheckBox checked={false} onClick={() => {}} />
              <span>선택해제</span>
            </CheckBoxWrapper>
            <Button>상품삭제</Button>
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
          buttonText={`${getButtonText(getTotalQuantity(products))}`}
          onButtonClick={handlePaymentSheetButtonClick}
        />
      </Main>
    </Page>
  );
};

ShoppingCart.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      image: PropTypes.string,
      imageAlt: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    })
  ),
};

export default ShoppingCart;
