import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  allCheckProduct,
  allUnCheckProduct,
  checkProduct,
  removeProductToCartAsync,
  setOrderDetail,
  unCheckProduct,
} from '../store/modules/cart/actions';
import { StyledImageWrapper, StyledImg } from './common';
import CheckBox from './common/CheckBox';

import Counter from './common/Counter';
import DeleteIconButton from './common/DeleteIconButton';
import PriceBox from './common/PriceBox';

function CartList({ products, checkedIds, count }) {
  const dispatch = useDispatch();
  const [allChecked, setAllChecked] = useState(true);

  const onClickCheckProduct = (id) => dispatch(checkProduct(id));
  const onClickUnCheckProduct = (id) => dispatch(unCheckProduct(id));

  const onClickAllCkeck = (isAllCheck) => {
    setAllChecked(isAllCheck);

    if (isAllCheck) {
      dispatch(allCheckProduct());
      return;
    }
    dispatch(allUnCheckProduct());
  };

  const handlRemoveProductsToCart = async (ids) => {
    if (ids.length === 0) {
      alert('삭제 할 상품을 선택해 주세요.');
      return;
    }

    const isRemove = window.confirm('해당 상품들을 장바구니에서 삭제 하시겠습니까?');
    if (!isRemove) return;

    await Promise.all(
      ids.map((id) => {
        return new Promise((resolve, reject) => {
          try {
            const res = dispatch(removeProductToCartAsync(id));
            resolve(res);
          } catch (err) {
            reject(err);
          }
        });
      })
    );
  };

  useEffect(() => {
    const isAllCheck = products.length === checkedIds.length;
    setAllChecked(isAllCheck);
  }, [checkedIds, products]);

  return (
    <StyledCartListLayout>
      <StyledCartListOptionWrapper>
        <CheckBox
          labelText={allChecked ? '선택해제' : '전체선택'}
          isClicked={allChecked}
          onClickCallback={onClickAllCkeck}
        />
        <StyledDeleteButton onClick={() => handlRemoveProductsToCart(checkedIds)}>
          상품 삭제
        </StyledDeleteButton>
      </StyledCartListOptionWrapper>
      <StyledCartListWrapper>
        <StyledCartListTitle>
          <span>든든배송 상품({count}개)</span>
        </StyledCartListTitle>
        <StyledCartList>
          {products.map((product) => {
            return (
              <CartListItem
                key={product.id}
                dispatch={dispatch}
                product={product}
                isClicked={checkedIds.includes(product.id)}
                onClickCheck={() => onClickCheckProduct(product.id)}
                onClickUnCheck={() => onClickUnCheckProduct(product.id)}
              />
            );
          })}
        </StyledCartList>
      </StyledCartListWrapper>
    </StyledCartListLayout>
  );
}

const CartListItem = ({ dispatch, product, isClicked, onClickCheck, onClickUnCheck }) => {
  const [itemPrice, setItemPrice] = useState(0);
  const { id, name, price, imageUrl } = product;

  const handleRemoveItem = (id) => {
    const isRemove = window.confirm('해당 상품을 장바구니에서 삭제 하시겠습니까?');
    if (isRemove) dispatch(removeProductToCartAsync(id));
  };

  const onClickCounterCallback = (count) => {
    const paymentAmount = price * count;
    dispatch(
      setOrderDetail({
        id,
        quantity: count,
        price,
        paymentAmount,
      })
    );
    setItemPrice(paymentAmount);
  };

  const onClickCheckCallback = (isCheck) => {
    if (isCheck) {
      onClickCheck();
      return;
    }
    onClickUnCheck();
  };

  useEffect(() => {
    setItemPrice(price);
  }, []);

  return (
    <StyledCartListItem>
      <StyledItemInfoWrapper>
        <div>
          <CheckBox isClicked={isClicked} onClickCallback={onClickCheckCallback} />
        </div>
        <StyledItemInfo>
          <StyledImageWrapper>
            <StyledImg src={imageUrl}></StyledImg>
          </StyledImageWrapper>
          <span>{name}</span>
        </StyledItemInfo>
      </StyledItemInfoWrapper>
      <StyledItemControlBox>
        <DeleteIconButton onClickCallback={() => handleRemoveItem(id)} />
        <Counter onClickCallback={onClickCounterCallback} />
        <PriceBox price={itemPrice} />
      </StyledItemControlBox>
    </StyledCartListItem>
  );
};

const StyledDeleteButton = styled.button`
  width: 117px;
  height: 50px;
  background: ${({ theme }) => theme.COLORS.WHITE};
  border: 1px solid #bbbbbb;
  border-radius: 0px;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  color: #333333;
  &:hover {
    background: ${({ theme }) => theme.COLORS.PRIMARY};
    color: ${({ theme }) => theme.COLORS.WHITE};
    cursor: pointer;
  }
`;

const StyledCartListLayout = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
`;

const StyledCartListOptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px 0;
`;

const StyledCartListWrapper = styled.div`
  width: 100%;
`;

const StyledCartListTitle = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 33px;
  letter-spacing: 0.5px;
  color: #333333;
  padding: 8px 0;
`;

const StyledCartList = styled.div``;
const StyledCartListItem = styled.div`
  border-top: 1.5px solid #cccccc;
  &:nth-child(1) {
    border-top: 4px solid #aaaaaa;
  }
  display: flex;
  justify-content: space-between;
  padding: 24px 0;
`;

const StyledItemInfo = styled.div`
  display: flex;
  gap: 16px;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #333333;
`;

const StyledItemInfoWrapper = styled.div`
  display: flex;
`;

const StyledItemControlBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

export default CartList;
