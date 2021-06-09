import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../components/common/Button';
import FlexContainer from '../../components/common/FlexContainer';
import Spinner from '../../components/common/Icon/Spinner';
import Loader from '../../components/common/Loader';
import Main from '../../components/Main';
import PageTitle from '../../components/shared/PageTitle';
import ProductList from '../../components/shared/ProductList';
import ProductListItem from '../../components/shared/ProductList/ProductListItem';

import { PAGES, UNIT } from '../../constants/appInfo';
import PALETTE from '../../constants/palette';

import { getOrders, resetOrders } from '../../redux/Orders/actions';

import * as Styled from './style';

const OrdersPage = () => {
  const { orderList, isLoading } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());

    return () => {
      dispatch(resetOrders());
    };
  }, []);

  return (
    <Styled.OrdersPageContainer>
      <Main>
        <PageTitle>{PAGES.ORDERS.NAME}</PageTitle>
        <Loader animationType={'spin'} isLoading={isLoading}>
          <Spinner width={'8rem'} color={PALETTE.BAEMINT} />
        </Loader>
        <FlexContainer direction="column">
          {orderList?.reverse().map((order) => (
            <FlexContainer key={order.order_id} margin="3rem 0 1rem 0" direction="column">
              <FlexContainer
                padding="1.5rem 1.5rem 1.5rem 2.5rem"
                border={`1px solid ${PALETTE.GRAY_001}`}
                backgroundColor={PALETTE.GRAY_007}
                justifyContent="space-between"
              >
                <span>주문번호: {order.order_id}</span>
                <Button type="button" backgroundColor="transparent">
                  {'상세보기 >'}
                </Button>
              </FlexContainer>
              <ProductList>
                {order?.order_details.map((product) => (
                  <ProductListItem
                    key={product.product_id}
                    product={product}
                    listStyle="tableStyle"
                    imageSize="9rem"
                    productDetail={{
                      text: `${(Number(product.price) * product.quantity).toLocaleString() + UNIT.MONEY} / 수량 : ${
                        product.quantity + UNIT.QUANTITY
                      }`,
                      color: PALETTE.GRAY_000,
                    }}
                  >
                    <Button
                      type="button"
                      backgroundColor={PALETTE.BAEMINT}
                      color={PALETTE.WHITE}
                      width="8.5rem"
                      height="3rem"
                    >
                      장바구니
                    </Button>
                  </ProductListItem>
                ))}
              </ProductList>
            </FlexContainer>
          ))}
        </FlexContainer>
      </Main>
    </Styled.OrdersPageContainer>
  );
};

export default OrdersPage;
