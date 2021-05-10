import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/shared/Button';
import HighlightText from '../../components/shared/HighlightText';
import NumericInput from '../../components/shared/NumericInput';
import Product from '../../components/shared/Product';
import { COLOR } from '../../constants';
import { setAllCartItemCheckbox, toggleCartItemCheckbox } from '../../store';
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
  const list = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const checkedCount = list.filter(item => item.checked).length;
  const isAllChecked = checkedCount === list.length;
  const checkOptionText = isAllChecked
    ? '선택해제'
    : checkedCount
    ? `${checkedCount}개 선택`
    : '전체선택';

  const onCheckBoxChange = ({ id }) => {
    dispatch(toggleCartItemCheckbox(id));
  };

  const onCheckOptionChange = () => {
    dispatch(setAllCartItemCheckbox(isAllChecked));
  };

  return (
    <Container>
      <Header>장바구니</Header>
      <Contents>
        <ProductListContainer>
          <ListOptionMenu>
            <CheckBox>
              <input type="checkbox" checked={isAllChecked} onChange={onCheckOptionChange} hidden />
              <span></span>
              {checkOptionText}
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
              {list.map(({ id, name, image, price, quantity, checked }) => (
                <ProductWrapper key={id}>
                  <CheckBox>
                    <input
                      type="checkbox"
                      onChange={() => onCheckBoxChange({ id })}
                      checked={checked}
                      hidden
                    />
                    <span></span>
                  </CheckBox>
                  <Product
                    thumbnail={{ image: image, alt: name, size: 'small' }}
                    information={{ title: name }}
                    extra={
                      <>
                        <button>휴지통</button>
                        {/* TODO: setValue 만들기 */}
                        <NumericInput value={quantity} />
                        <div>{(price * quantity).toLocaleString('ko-KR')} 원</div>
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
