import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { PAGES, UNIT } from '../../../constants/appInfo';
import PALETTE from '../../../constants/palette';
import FlexContainer from '../../common/FlexContainer';
import Main from '../../Main';
import PageTitle from '../../shared/PageTitle';
import ProductList from '../../shared/ProductList';
import ProductListItem from '../../shared/ProductList/ProductListItem';
import * as Styled from './style';

const OrdersPage = () => {
  const { orders } = useSelector((state) => state);

  return (
    <Styled.OrdersPageContainer>
      <Main>
        <PageTitle>{PAGES.ORDERS.name}</PageTitle>
        <FlexContainer direction="column">
          {orders.reverse().map((order) => (
            <FlexContainer key={order.id} margin="3rem 0 1rem" direction="column">
              <FlexContainer
                padding="1.5rem 1.5rem 1.5rem 2.5rem"
                border={`1px solid ${PALETTE.GRAY_001}`}
                backgroundColor={PALETTE.GRAY_007}
                justifyContent="space-between"
              >
                <span>주문번호: {order.id}</span>
              </FlexContainer>
              <ProductList>
                {order.products.map((product) => (
                  <ProductListItem
                    key={product.id}
                    product={product}
                    listStyle="tableStyle"
                    imageSize="9rem"
                    productDetail={{
                      text: `${(Number(product.price) * product.amount).toLocaleString() + UNIT.MONEY} / 수량 : ${
                        product.amount + UNIT.AMOUNT
                      }`,
                      color: PALETTE.GRAY_000,
                    }}
                  />
                ))}
              </ProductList>
            </FlexContainer>
          ))}
        </FlexContainer>
      </Main>
    </Styled.OrdersPageContainer>
  );
};

OrdersPage.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      products: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          price: PropTypes.string.isRequired,
          image: PropTypes.string,
          amount: PropTypes.number,
        })
      ),
    })
  ),
};

export default OrdersPage;
