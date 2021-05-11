import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PAGES } from '../../../constants/appInfo';
import { removeCheckedProducts } from '../../../redux/Cart/actions';
import { setOrder } from '../../../redux/Orders/actions';
import FlexContainer from '../../common/FlexContainer';
import Main from '../../Main';
import PageTitle from '../../shared/PageTitle';
import PriceInfoBox from '../../shared/PriceInfoBox';
import ProductList from '../../shared/ProductList';
import ProductListItem from '../../shared/ProductList/ProductListItem';
import * as Styled from './style';

const CheckoutPage = () => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const checkedProducts = cart.filter((product) => product.isChecked);
  const totalPrice = checkedProducts.reduce((prev, product) => prev + Number(product.price) * product.amount, 0);

  const onOrder = () => {
    const order = checkedProducts.map((product) => {
      const productCopy = { ...product };
      delete productCopy.isChecked;

      return productCopy;
    });

    dispatch(setOrder(order));

    alert('주문 성공!');
    dispatch(removeCheckedProducts());
  };

  return (
    <Main>
      <PageTitle>{PAGES.CHECKOUT.NAME}</PageTitle>
      <FlexContainer align="flex-start">
        <FlexContainer width="58%" margin="3rem auto 0 1.5rem" direction="column">
          <Styled.ProductListTitle>{`주문 상품(${checkedProducts.length}건)`}</Styled.ProductListTitle>
          <ProductList>
            {checkedProducts.map((product) => (
              <ProductListItem
                key={product.id}
                listStyle="lineStyle"
                isCheckbox={false}
                imageSize="7.5rem"
                product={product}
                productDetail={{ text: `수량: ${product.amount}` }}
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
          onOrder={onOrder}
        />
      </FlexContainer>
    </Main>
  );
};

export default CheckoutPage;
