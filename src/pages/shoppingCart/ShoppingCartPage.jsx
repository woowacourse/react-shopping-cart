/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Checkbox from 'components/base/checkBox/CheckBox';
import Header from 'components/base/header/Header';
import Title from 'components/base/title/Title';
import PageTitle from 'components/pageTitle/PageTitle';
import TotalAmount from 'components/totalAmount/TotalAmount';
import ShoppingCartItem from 'components/shoppingCartItem/ShoppingCartItem';

import {
  getShoppingCartList,
  putShoppingCartItem,
  deleteShoppingCartItem,
} from 'middlewares/shoppingCarts';

import {
  ContentWrapper,
  PageWrapper,
  ShoppingCartBox,
  TotalAmountContainer,
  ProductDeleteButton,
  ShoppingCartContainer,
  UnderLine,
} from './style';

const ShoppingCartPage = () => {
  const dispatch = useDispatch();
  const { shoppingCartList } = useSelector(state => state.shoppingCartReducer.shoppingCarts);
  const totalAmount = shoppingCartList.filter(product => product.isSelect === true).length;
  const totalPrice = shoppingCartList
    .filter(product => product.isSelect === true)
    .reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const isAllSelect =
    shoppingCartList.length === 0
      ? false
      : shoppingCartList.every(product => product.isSelect === true);

  const handleClickCheckBox = () => {
    if (isAllSelect === false) {
      shoppingCartList.forEach(product => {
        dispatch(putShoppingCartItem({ ...product, isSelect: true }));
      });
    } else {
      shoppingCartList.forEach(product =>
        dispatch(putShoppingCartItem({ ...product, isSelect: false })),
      );
    }
  };

  const handleClickDeleteButton = () => {
    const selectedProductList = shoppingCartList.filter(product => product.isSelect === true);
    selectedProductList.forEach(product => {
      dispatch(deleteShoppingCartItem({ id: product.id }));
    });
  };

  useEffect(() => {
    dispatch(getShoppingCartList());
  }, [dispatch]);

  return (
    <PageWrapper>
      <PageTitle title="장바구니" />
      <ContentWrapper>
        <ShoppingCartContainer>
          <Header
            left={
              <Checkbox checked={isAllSelect} label="전체선택" onChange={handleClickCheckBox} />
            }
            right={
              <ProductDeleteButton onClick={handleClickDeleteButton}>상품삭제</ProductDeleteButton>
            }
          />
          <Title title="든든배송 상품" />
          <ShoppingCartBox>
            {shoppingCartList.map(product => (
              <React.Fragment key={product.id}>
                <ShoppingCartItem product={product}></ShoppingCartItem>
                <UnderLine />
              </React.Fragment>
            ))}
          </ShoppingCartBox>
        </ShoppingCartContainer>
        <TotalAmountContainer>
          <TotalAmount totalPrice={totalPrice} totalAmount={totalAmount} />
        </TotalAmountContainer>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default ShoppingCartPage;
