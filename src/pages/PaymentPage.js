import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useLocation, useHistory } from 'react-router-dom';

import Flex from '../components/utils/Flex';
import PaymentItem from '../components/PaymentItem';
import PageTitle from '../components/PageTitle';
import FloatingBox from '../components/FloatingBox';

import { addPaymentItems } from '../modules/payment';

import { deleteCheckedItems, getTotalPrice } from '../utils';

import styled, { css } from 'styled-components';

const PaymentItemSection = styled.section`
  width: 763px;
  margin: 42px 25px;
`;

const PaymentItemSectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  line-height: 33px;
  margin: 8px;
`;

const PaymentList = styled.ul`
  margin-top: 32px;
  border-top: 4px solid #aaaaaa;
`;

const PaymentPageWrapperStyle = css`
  width: 1320px;
`;

const PaymentPage = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const cartItemsToPayment = location.state;

  if (!cartItemsToPayment) return <Redirect to="/" />;

  const onOrderButtonClick = () => {
    dispatch(addPaymentItems(cartItemsToPayment));

    deleteCheckedItems(
      dispatch,
      cartItemsToPayment.map((item) => item.id),
    );

    history.replace('/cart');
  };

  return (
    <>
      <PageTitle pageTitle="주문/결제" />

      <Flex justifyContent="space-between" css={PaymentPageWrapperStyle}>
        <PaymentItemSection>
          <PaymentItemSectionTitle>주문 상품({location.state.length}건)</PaymentItemSectionTitle>
          <PaymentList>
            {location.state &&
              location.state
                .map((paymentItem) => <PaymentItem key={paymentItem.id} paymentItem={paymentItem} />)
                .reverse()}
          </PaymentList>
        </PaymentItemSection>

        <FloatingBox price={getTotalPrice(location.state)} linkPath={'/orders'} onClick={onOrderButtonClick} />
      </Flex>
    </>
  );
};

export default PaymentPage;
