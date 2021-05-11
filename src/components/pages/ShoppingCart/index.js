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
import { useSelector } from 'react-redux';

const ShoppingCart = () => {
  const products = Object.values(
    useSelector(({ product }) => product.pickedProducts)
  );

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
                  <ShoppingItem {...product} />
                </li>
              ))}
            </ul>
          </ShoppingList>
        </div>
        <PaymentSheet
          title="결제예상금액"
          priceInfo="결제예상금액"
          price={10000}
          buttonText="주문하기"
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
