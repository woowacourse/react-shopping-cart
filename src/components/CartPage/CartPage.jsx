import styled from 'styled-components';
import CartHeader from 'components/CartPage/CartHeader';
import CartProduct from 'components/CartPage/CartProduct';
import Order from 'components/CartPage/Order';
import CheckBox from 'components/CartPage/CheckBox';
import { DivideUnderLine } from 'components/shared/styles';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function CartPage() {
  const { carts } = useSelector((state) => state.carts);

  const [checkedList, setCheckedList] = useState(carts);

  const updateCheckedList = (product, isChecked) => {
    if (isChecked) {
      setCheckedList(checkedList.filter((item) => item.id !== product.id));
      return;
    }
    const newList = [...checkedList];

    newList.push(product);
    setCheckedList(newList);
  };

  const selectAll = (isChecked) => {
    if (isChecked) {
      setCheckedList([]);
      return;
    }
    setCheckedList(carts);
  };

  useEffect(() => {
    setCheckedList(carts);
  }, [carts]);

  return (
    <Styled.CartSection>
      <CartHeader />
      <Styled.CartBody>
        <Styled.CartLeftSection>
          <Styled.CartSelectorWrapper>
            <Styled.CheckBoxContainer>
              <CheckBox
                checked={carts.length === checkedList.length}
                updateList={selectAll}
              />
              <Styled.CancelSelectLabel htmlFor="checkbox">
                선택해제
              </Styled.CancelSelectLabel>
            </Styled.CheckBoxContainer>
            <Styled.DeleteProductButton>상품삭제</Styled.DeleteProductButton>
          </Styled.CartSelectorWrapper>
          <Styled.CartListTitle>{`돔하디배송 상품(${carts.length}개)`}</Styled.CartListTitle>
          <Styled.CartDivideLine shape="greyThick" />
          {carts.map((product) => (
            <React.Fragment key={product.id}>
              <CartProduct
                product={product}
                checkedList={checkedList}
                updateCheckedList={updateCheckedList}
              />
              <Styled.CartDivideLine shape="greyThin" />
            </React.Fragment>
          ))}
        </Styled.CartLeftSection>
        <Order checkedList={checkedList} />
      </Styled.CartBody>
    </Styled.CartSection>
  );
}

export default CartPage;

const Styled = {
  CartSection: styled.section`
    padding: 24px 300px;
    min-width: 1500px;
  `,
  CartBody: styled.div`
    display: flex;
  `,
  CartLeftSection: styled.section`
    width: 60%;
    margin-top: 50px;
  `,
  CartSelectorWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 26px;
  `,
  CheckBoxContainer: styled.div`
    display: flex;
    align-items: center;
  `,
  CancelSelectLabel: styled.label`
    padding-left: 7px;
  `,
  DeleteProductButton: styled.button`
    padding: 12px 22px;
    border: 1px solid #bbbbbb;
    background-color: white;
  `,
  CartListTitle: styled.h3`
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 400;
  `,
  CartDivideLine: styled(DivideUnderLine)`
    margin-top: 10px;
    ${({ shape }) => {
      switch (shape) {
        case 'blackThick':
          return 'border: 2px solid black;';
        case 'greyThick':
          return 'border: 2px solid #aaaaaa;';
        case 'greyThin':
        default:
          return 'border: 1px solid #cccccc;';
      }
    }}
  `,
};
