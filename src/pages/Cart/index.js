import React from 'react';
import Button from '../../components/shared/Button';
import HighlightText from '../../components/shared/HighlightText';
import NumericInput from '../../components/shared/NumericInput';
import Product from '../../components/shared/Product';
import { COLOR } from '../../constants';
import {
  Container,
  Header,
  Contents,
  ListOptionMenu,
  ProductListContainer,
  ProductListWrapper,
  ProductListHeader,
  ProductList,
  ProductWrapper,
  ReceiptWrapper,
  ReceiptHeader,
  ReceiptContent,
  ReceiptRow,
  CheckBox,
} from './style';

const Cart = () => {
  return (
    <Container>
      <Header>장바구니</Header>
      <Contents>
        <ProductListContainer>
          <ListOptionMenu>
            <CheckBox>
              <input type="checkbox" hidden />
              <span></span>
              전체선택
            </CheckBox>
            <Button
              type="button"
              width="118px"
              height="50px"
              backgroundColor={COLOR.WHITE}
              borderColor={COLOR['GRAY-300']}
              fontSize="1rem"
            >
              상품 삭제
            </Button>
          </ListOptionMenu>
          <ProductListWrapper>
            <ProductListHeader>든든배송상품</ProductListHeader>
            <ProductList>
              {Array.from({ length: 10 }).map(() => (
                <ProductWrapper>
                  <CheckBox>
                    <input type="checkbox" hidden />
                    <span></span>
                  </CheckBox>
                  <Product
                    thumbnail={{ image: '', alt: '', size: 'small' }}
                    information={{ title: 'title', description: 'description' }}
                    extra={
                      <>
                        <button>휴지통</button>
                        <NumericInput />
                        <div>10,000원</div>
                      </>
                    }
                  />
                </ProductWrapper>
              ))}
            </ProductList>
          </ProductListWrapper>
        </ProductListContainer>
        <ReceiptWrapper>
          <ReceiptHeader>결제예상금액 헤더</ReceiptHeader>
          <ReceiptContent>
            <ReceiptRow>
              <HighlightText color={COLOR.HIGHLIGHT_MINT} fontSize="1.25rem">
                결제예상금액
              </HighlightText>
              <HighlightText color={COLOR.HIGHLIGHT_MINT} fontSize="1.25rem">
                10,000원
              </HighlightText>
            </ReceiptRow>
            <Button
              type="button"
              width="100%"
              height="74px"
              backgroundColor={COLOR.MINT}
              color={COLOR.WHITE}
              fontSize="1.5rem"
            >
              주문하기
            </Button>
          </ReceiptContent>
        </ReceiptWrapper>
      </Contents>
    </Container>
  );
};

export default Cart;
