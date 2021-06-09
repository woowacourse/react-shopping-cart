import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';

import Flex from '../../components/utils/Flex';
import PageTitle from '../../components/PageTitle';
import FloatingBox from '../../components/FloatingBox';
import PaymentItem from './PaymentItem';

import { orderItemsRequest, reset } from '../../modules/paymentSlice';

import { getTotalPrice } from '../../utils';
import { COLOR, STATUS } from '../../constant';

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
  border-top: 4px solid ${COLOR.GRAY[600]};
`;

const PaymentPageWrapperStyle = css`
  width: 1320px;
`;

const PaymentPage = () => {
  const { orderList, status, errorMessage } = useSelector((state) => state.paymentSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === STATUS.SUCCEED) {
      dispatch(reset());
    }

    if (status === STATUS.FAILED) {
      alert(errorMessage);
      dispatch(reset());
    }
  }, [status, errorMessage, dispatch, orderList]);

  const onPaymentButtonClick = async (orderList) => {
    await dispatch(orderItemsRequest(orderList));
  };

  return (
    <>
      <PageTitle pageTitle="주문/결제" />

      <Flex justifyContent="space-between" css={PaymentPageWrapperStyle}>
        <PaymentItemSection>
          <PaymentItemSectionTitle>주문 상품({orderList.length}건)</PaymentItemSectionTitle>
          <PaymentList>
            {orderList &&
              orderList.map((orderItem) => <PaymentItem key={orderItem.cart_id} {...orderItem} />).reverse()}
          </PaymentList>
        </PaymentItemSection>

        <FloatingBox
          price={getTotalPrice(orderList)}
          linkPath={'/orders'}
          onClick={() => onPaymentButtonClick(orderList)}
        />
      </Flex>
    </>
  );
};

export default PaymentPage;
