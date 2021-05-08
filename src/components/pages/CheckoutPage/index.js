import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { PAGES } from '../../../constants/appInfo';
import PALETTE from '../../../constants/palette';
import Button from '../../common/Button';
import FlexContainer from '../../common/FlexContainer';
import Main from '../../Main';
import PageTitle from '../../shared/PageTitle';
import ProductList from '../../shared/ProductList';
import ProductListItem from '../../shared/ProductList/ProductListItem';
import PriceInfoBox from '../../shared/PriceInfoBox';
import * as Styled from './style';

const CheckoutPage = ({ products }) => {
  const totalPrice = products.reduce((prev, product) => prev + product.price * product.amount, 0);
  return (
    <Main>
      <PageTitle>{PAGES.CHECKOUT.NAME}</PageTitle>
      <FlexContainer align="flex-start">
        <FlexContainer width="58%" margin="3rem auto 0 1.5rem" direction="column">
          <Styled.ProductListTitle>{`주문 상품(${products.length}건)`}</Styled.ProductListTitle>
          <ProductList>
            {products.map((item) => (
              <ProductListItem
                key={item.id}
                listStyle="lineStyle"
                isCheckbox={false}
                imageSize="7.5rem"
                product={item}
                productDetail={{ text: `수량: ${item.amount}` }}
              />
            ))}
          </ProductList>
        </FlexContainer>
        <PriceInfoBox
          width="30%"
          margin="6rem 1.5rem 0 auto"
          title="결제금액"
          priceInfo={{ name: '총 결제금액', price: totalPrice }}
          submitInfo={{ text: `${totalPrice.toLocaleString()}원 결제하기`, address: PAGES.ORDERS.ADDRESS }}
        />
      </FlexContainer>
    </Main>
  );
};

CheckoutPage.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.shape({
        url: PropTypes.string,
        alt: PropTypes.string,
      }),
      amount: PropTypes.number,
    })
  ),
};

export default CheckoutPage;
