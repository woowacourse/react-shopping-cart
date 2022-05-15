import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartAsync } from '../../../store/actions/cart';
import CheckBox from '../../common/CheckBox/CheckBox';
import CartProductCard from '../CartProductCard/CartProductCard';
import * as Styled from './CartProductList.style';

function CartProductList() {
  const dispatch = useDispatch();

  const {
    cart: { cart },
  } = useSelector(({ cart }) => cart);
  const cartLength = useMemo(() => cart && Object.keys(cart).length, [cart]);

  useEffect(() => {
    dispatch(fetchCartAsync());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [productCheckArray, setProductCheckArray] = useState([]);

  const isAllChecked = useMemo(
    () => productCheckArray.every((checked) => checked),
    [productCheckArray],
  );

  useEffect(() => {
    setProductCheckArray(new Array(cartLength).fill(true));
  }, [cartLength]);

  const setProductCheck = (index) => {
    setProductCheckArray((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = !newArray[index];
      return newArray;
    });
  };

  const toggleAllCheck = () => {
    if (isAllChecked) {
      setProductCheckArray(new Array(cartLength).fill(false));
      return;
    }
    setProductCheckArray(new Array(cartLength).fill(true));
  };

  return (
    <Styled.Container>
      <Styled.ListControlWrapper>
        <Styled.AllCheckControl>
          <CheckBox checked={isAllChecked} onClick={toggleAllCheck} />
          <Styled.CheckBoxLabel>
            {isAllChecked ? '전체 선택해제' : '전체 선택하기'}
          </Styled.CheckBoxLabel>
        </Styled.AllCheckControl>
        <Styled.Button type="button">선택 상품 삭제</Styled.Button>
      </Styled.ListControlWrapper>
      <Styled.Title>장바구니 상품 목록 ({cartLength}개)</Styled.Title>
      <Styled.ListWrapper>
        {cart &&
          Object.keys(cart).map((id, index) => {
            const { productData, quantity } = cart[id];

            return (
              <CartProductCard
                key={id}
                product={productData}
                quantity={quantity}
                checked={productCheckArray[index]}
                setChecked={() => setProductCheck(index)}
              />
            );
          })}
      </Styled.ListWrapper>
    </Styled.Container>
  );
}

export default CartProductList;
