import styled from 'styled-components';
import CartHeader from 'components/CartPage/CartHeader';
import CartProduct from 'components/CartPage/CartProduct';
import Order from 'components/CartPage/Order';
import CheckBox from 'components/CartPage/CheckBox';
import { DivideUnderLine } from 'components/shared/styles';
import React from 'react';

const dummyProducts = [
  {
    id: '11',
    price: '4800',
    src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000001636]_20210225093600536.jpg',
    title: '콜드 브루 몰트',
  },
  {
    id: '22',
    price: '4200',
    src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000000487]_20210430112319040.jpg',
    title: '바닐라 크림 콜드 브루',
  },
  {
    id: '33',
    price: '5500',
    src: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[72]_20210415140949967.jpg',
    title: '시그니처 핫 초콜릿',
  },
];

function CartPage() {
  return (
    <Styled.CartSection>
      <CartHeader />
      <Styled.CartBody>
        <Styled.CartLeftSection>
          <Styled.CartSelectorWrapper>
            <Styled.CheckBoxContainer>
              <CheckBox />
              <Styled.CancelSelectLabel for="checkbox">
                선택해제
              </Styled.CancelSelectLabel>
            </Styled.CheckBoxContainer>
            <Styled.DeleteProductButton>상품삭제</Styled.DeleteProductButton>
          </Styled.CartSelectorWrapper>
          <Styled.CartListTitle>든든배송 상품(3개)</Styled.CartListTitle>
          <Styled.CartDivideLine shape="greyThick" />
          {dummyProducts.map((product) => (
            <React.Fragment key={product.id}>
              <CartProduct product={product} />
              <Styled.CartDivideLine shape="greyThin" />
            </React.Fragment>
          ))}
        </Styled.CartLeftSection>
        <Order />
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
