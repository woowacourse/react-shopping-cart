import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  addCartItem,
  deleteCartItem,
  deleteCheckedItem,
  initCartList,
  toggleTotalCheck,
  minusCartItem,
  toggleCheckItem,
} from 'reduxModule/cart';
import { setCartList } from 'utils/cart';
import { getProductInfoList } from 'reduxModule/productInfoList';

import Title from 'components/common/Title';
import CartProductItem from './CartProductItem';
import CheckBox from 'components/common/Styled/CheckBox';
import PaymentModal from 'components/common/Modal/PaymentModal';
import { DeleteButton } from 'components/common/Styled';

const Styled = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
  `,
  Wrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 50px;
  `,
  CartContentBox: styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
    margin-top: 50px;
  `,
  CartDeleteBox: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 30px;
  `,
  CartDeleteSelector: styled.div`
    position: relative;
    display: flex;
    width: 500px;
    height: 40px;
    flex-direction: row;

    & > div {
      top: -20px;
      position: absolute;
    }
    & > span {
      margin-left: 50px;
      margin-top: 5px;
    }
  `,
  CartProductList: styled.div`
    display: flex;
    flex-direction: column;
  `,
  CartProductListContent: styled.div`
    margin-top: 40px;
  `,
  CartProductTotalAmount: styled.p`
    position: relative;
    padding: 10px 0;

    :after {
      content: '';
      position: absolute;
      left: 0px;
      bottom: -10px;
      height: 3px;
      width: 100%;
      background: #aaaaaa;
    }
  `,
  PaymentModalBox: styled.div`
    margin-top: 100px;
  `,
};

const Cart = () => {
  const dispatch = useDispatch();
  const cartList = useSelector(({ cartReducer }) => cartReducer.cartList);
  const productInfoList = useSelector(
    ({ productInfoListReducer }) => productInfoListReducer.productInfoList,
  );

  const [totalCount, setTotalCount] = useState(0);
  const [totalCheckedPrice, setTotalCheckedPrice] = useState(0);
  const [totalCheckedCount, setTotalCheckedCount] = useState(0);

  useEffect(() => {
    initCartList();
  }, []);

  useEffect(() => {
    setCartList(cartList).then(() => {
      dispatch(getProductInfoList());
    });
  }, [cartList]);

  useEffect(() => {
    setTotalCount(
      cartList.length !== 0
        ? cartList.map((item) => item.quantity).reduce((prev, cur) => prev + cur, 0)
        : 0,
    );

    setTotalCheckedCount(cartList.length !== 0 ? cartList.map((item) => item.isChecked).length : 0);

    setTotalCheckedPrice(
      cartList.length !== 0
        ? productInfoList.reduce((prev, cur) => {
            const existItem = cartList.find((item) => item.isChecked && item.id === cur.id);
            if (existItem === undefined) {
              return prev;
            }
            return cur.quantity * cur.price + prev;
          }, 0)
        : 0,
    );
  }, [cartList, productInfoList]);

  const onPlusCartButtonClick = (id) => {
    dispatch(addCartItem(id));
  };

  const onMinusCartButtonClick = (id) => {
    dispatch(minusCartItem(id));
  };

  const onDeleteCartButtonClick = (id) => {
    if (window.confirm('상품을 장바구니에서 제거하시겠습니까?')) {
      dispatch(deleteCartItem(id));
    }
  };

  const onToggleTotalClick = () => {
    dispatch(toggleTotalCheck());
  };

  const onToggleCheckClick = (id) => {
    dispatch(toggleCheckItem(id));
  };

  const getIsCheck = (id) => {
    if (cartList.length === 0) {
      return false;
    }
    const checkedItem = cartList.find((item) => item.id === id);
    return checkedItem !== undefined ? checkedItem.isChecked : false;
  };

  const getIsTotalCheck = () => {
    if (cartList.length === 0) {
      return false;
    }
    return cartList.reduce((prev, cur) => cur.isChecked && prev, true);
  };

  const onDeleteCheckedClick = () => {
    if (window.confirm('체크된 항목들을 모두 장바구니에서 삭제하시겠습니까?')) {
      dispatch(deleteCheckedItem());
    }
  };

  return (
    <Styled.Container>
      <Title>장바구니</Title>
      <Styled.Wrapper>
        <Styled.CartContentBox>
          <Styled.CartDeleteBox>
            <Styled.CartDeleteSelector
              onClick={(e) => {
                e.preventDefault();
                onToggleTotalClick();
              }}
            >
              <CheckBox id={'total'} isChecked={getIsTotalCheck()} />
              <span>{getIsTotalCheck() ? '선택해제' : '전체선택'}</span>
            </Styled.CartDeleteSelector>
            <DeleteButton
              onClick={() => {
                onDeleteCheckedClick();
              }}
            >
              상품삭제{' '}
            </DeleteButton>
          </Styled.CartDeleteBox>
          <Styled.CartProductList>
            <Styled.CartProductTotalAmount>
              라인프렌즈 상품 ({totalCount}개)
            </Styled.CartProductTotalAmount>
            <Styled.CartProductListContent>
              {productInfoList && productInfoList.length !== 0 ? (
                productInfoList.map((item) => {
                  return (
                    <CartProductItem
                      key={`${item.name}${item.id}`}
                      productInfo={item}
                      onPlusCartButtonClick={onPlusCartButtonClick}
                      onMinusCartButtonClick={onMinusCartButtonClick}
                      onDeleteCartButtonClick={onDeleteCartButtonClick}
                      onToggleCheckClick={onToggleCheckClick}
                      isChecked={getIsCheck(item.id)}
                    />
                  );
                })
              ) : (
                <div>상품이 비어있음</div>
              )}
            </Styled.CartProductListContent>
          </Styled.CartProductList>
        </Styled.CartContentBox>
        <Styled.PaymentModalBox>
          <PaymentModal type="cart" amount={totalCheckedPrice} totalCount={totalCheckedCount} />
        </Styled.PaymentModalBox>
      </Styled.Wrapper>
    </Styled.Container>
  );
};

export default Cart;
