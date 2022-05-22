import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Title from 'components/common/Title';
import CartProductItem from './CartProductItem';
import CheckBox from 'components/common/Styled/CheckBox';
import PaymentModal from 'components/common/Modal/PaymentModal';
import { DeleteButton } from 'components/common/Styled';
import { deleteCheckedItem } from 'modules/cart';

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

const Cart = ({
  cartList,
  onPlusCartButtonClick,
  onMinusCartButtonClick,
  onDeleteCartButtonClick,
}) => {
  const dispatch = useDispatch();
  const [checkList, setCheckList] = useState([]);
  const [productInfoList, setProductInfoList] = useState([]);

  const [totalCount, setTotalCount] = useState(0);
  const [totalCheckedPrice, setTotalCheckedPrice] = useState(0);
  const [totalCheckedCount, setTotalCheckedCount] = useState(0);

  useEffect(() => {
    setTotalCount(
      cartList.length !== 0
        ? cartList.map((item) => item.quantity).reduce((prev, next) => prev + next, 0)
        : 0,
    );

    setTotalCheckedPrice(
      checkList.length !== 0
        ? checkList.reduce((prev, cur) => {
            const productInfo = productInfoList.find((item) => Number(item.id) === Number(cur));
            if (productInfo === undefined) {
              return prev;
            }
            return prev + productInfo.price * productInfo.quantity;
          }, 0)
        : 0,
    );

    setTotalCheckedCount(
      checkList.length !== 0
        ? checkList.reduce((prev, cur) => {
            const productInfo = productInfoList.find((item) => Number(item.id) === Number(cur));
            if (productInfo === undefined) {
              return prev;
            }
            return prev + productInfo.quantity;
          }, 0)
        : 0,
    );
  }, [checkList, cartList]);

  const onToggleTotalClick = () => {
    if (cartList.length === checkList.length) {
      setCheckList([]);
      return;
    }
    const checkedList = cartList.map((item) => item.id);
    setCheckList(checkedList);
  };

  const onToggleCheckClick = (id) => {
    if (checkList.includes(id)) {
      setCheckList(checkList.filter((item) => item !== Number(id)));
      return;
    }
    if (checkList.includes(id) && checkList.length === 1) {
      setCheckList([]);
      return;
    }
    setCheckList(checkList.concat(id));
  };
  const getIsCheck = (id) => {
    return checkList.includes(id);
  };

  const getIsTotalCheck = () => {
    return checkList.length === cartList.length && checkList.length !== 0;
  };

  const onDeleteCheckedClick = () => {
    if (checkList.length === 0) {
      return;
    }
    if (window.confirm('체크된 항목들을 모두 장바구니에서 삭제하시겠습니까?')) {
      dispatch(deleteCheckedItem(checkList));
    }
  };

  useEffect(() => {
    if (cartList.length === 0) {
      setProductInfoList([]);
      return;
    }
    fetch(`${process.env.REACT_APP_BASE_URL}/cartList`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((infoList) => {
        setProductInfoList(infoList);
      });
  }, [cartList]);

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
              <span>{checkList.length === cartList.length ? '선택해제' : '전체선택'}</span>
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
              {productInfoList.length !== 0 ? (
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

Cart.propTypes = {
  cartList: PropTypes.array,
  onPlusCartButtonClick: PropTypes.func,
  onMinusCartButtonClick: PropTypes.func,
  onDeleteCartButtonClick: PropTypes.func,
};

export default Cart;
