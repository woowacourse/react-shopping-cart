/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
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
} from 'modules/shoppingCarts';

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
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isAllSelect, setIsAllSelect] = useState(false);

  const handleClickCheckBox = () => {
    if (isAllSelect === false) {
      shoppingCartList.forEach(product => {
        dispatch(putShoppingCartItem({ ...product, isSelect: true }));
      });
    } else {
      shoppingCartList.forEach(product =>
        dispatch(putShoppingCartItem({ ...product, isSelect: false })),
      );
      setIsAllSelect(false);
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

  useEffect(() => {
    if (shoppingCartList.length === 0) {
      setTotalPrice(0);
      setTotalAmount(0);
      setIsAllSelect(false);
      return;
    }

    const selectedProductList = shoppingCartList.filter(product => product.isSelect === true);
    setTotalAmount(selectedProductList.length);

    if (selectedProductList.length === 0) {
      setTotalPrice(0);
      return;
    }

    if (selectedProductList.length === shoppingCartList.length) {
      setIsAllSelect(true);
    }

    setTotalPrice(selectedProductList.reduce((acc, curr) => acc + curr.price * curr.quantity, 0));
  }, [shoppingCartList]);

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
