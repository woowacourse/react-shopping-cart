import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../PageHeader';
import PaymentSheet from '../../PaymentSheet';
import OrderItem from '../../OrderItem';
import { formatPrice, getTotalPrice, getTotalQuantity } from '../../../utils';
import { Main, OrderList, Page } from './index.styles';
import { ACTION_TYPE, ROUTE } from '../../../constants';
import { useHistory } from 'react-router';

const OrderPayment = () => {
  const products = Object.values(
    useSelector(({ product }) => product.pickedProducts)
  );
  const checkedProducts = products.filter(({ isChecked }) => isChecked);

  const dispatch = useDispatch();
  const history = useHistory();

  const handlePaymentSheetButtonClick = () => {
    if (!window.confirm('결제를 진행하시겠습니까?')) return;
    dispatch({
      type: ACTION_TYPE.ORDER.ADD_TO_ORDER_LIST,
      products: checkedProducts,
    });
    dispatch({ type: ACTION_TYPE.PRODUCTS.DELETE_CHECKED });
    history.push(ROUTE.COMPLETED_ORDER);
  };

  return (
    <Page>
      <PageHeader>주문/결제</PageHeader>
      <Main>
        <OrderList>
          <div>주문상품({getTotalQuantity(products)}개)</div>
          <ul>
            {checkedProducts.map(product => (
              <li key={product.id}>
                <OrderItem {...product} isOrdered={false} />
              </li>
            ))}
          </ul>
        </OrderList>
        <PaymentSheet
          title="결제금액"
          priceInfo="총 결제금액"
          price={formatPrice(getTotalPrice(products))}
          buttonText={`${formatPrice(getTotalPrice(products))}원 결제하기`}
          onButtonClick={handlePaymentSheetButtonClick}
        />
      </Main>
    </Page>
  );
};

export default OrderPayment;
