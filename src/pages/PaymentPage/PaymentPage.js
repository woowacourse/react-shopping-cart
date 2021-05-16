import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Flex from '../../components/utils/Flex';
import PaymentItem from './PaymentItem';
import PageTitle from '../../components/PageTitle';
import FloatingBox from '../../components/FloatingBox';

import { deleteCheckedItems, getTotalPrice } from '../../utils';

import { COLOR } from '../../constant';

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
  border-top: 4px solid ${COLOR.GRAY[600]};
`;

const PaymentPageWrapperStyle = css`
  width: 1320px;
`;

const PaymentPage = () => {
  const paymentItems = useSelector((state) => state.payment);
  const dispatch = useDispatch();

  const onOrderButtonClick = () => {
    deleteCheckedItems(
      dispatch,
      paymentItems.map((item) => item.id),
    );
  };

  return (
    <>
      <PageTitle pageTitle="주문/결제" />

      <Flex justifyContent="space-between" css={PaymentPageWrapperStyle}>
        <PaymentItemSection>
          <PaymentItemSectionTitle>주문 상품({paymentItems.length}건)</PaymentItemSectionTitle>
          <PaymentList>
            {paymentItems &&
              paymentItems.map((paymentItem) => <PaymentItem key={paymentItem.id} {...paymentItem} />).reverse()}
          </PaymentList>
        </PaymentItemSection>

        <FloatingBox price={getTotalPrice(paymentItems)} linkPath={'/orders'} onClick={onOrderButtonClick} />
      </Flex>
    </>
  );
};

export default PaymentPage;
