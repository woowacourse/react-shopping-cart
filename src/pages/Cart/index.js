import React from 'react';
import { useHistory } from 'react-router';
import { Button, HighlightText, NumericInput, Product, IconButton } from '../../components/shared/';
import { COLOR, MESSAGE, PATH } from '../../constants';
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
import { ReactComponent as TrashBin } from '../../assets/icons/trash-bin.svg';
import { FAILURE } from '../../constants/status';
import { useCart } from '../../hooks/useCart';

const Cart = () => {
  const {
    cartStatus,
    cartItems,
    totalPrice,
    checkedCount,
    deleteCartItem,
    deleteCartItems,
    isAllChecked,
    toggleCartItem,
    toggleAllCartItem,
    changeCartItemQuantity,
  } = useCart();

  const checkOptionText = isAllChecked
    ? '선택해제'
    : checkedCount
    ? `${checkedCount}개 선택`
    : '전체선택';

  const isPurchasable = totalPrice > 0;

  const history = useHistory();

  const onCheckBoxChange = id => {
    toggleCartItem(id);
  };

  const onCheckOptionChange = () => {
    toggleAllCartItem();
  };

  const onItemQuantityChange = id => quantity => {
    changeCartItemQuantity({ id, quantity });
  };

  const onDeleteItems = () => {
    if (window.confirm(MESSAGE.CONFIRM_DELETE_ITEM)) {
      deleteCartItems();
    }
  };

  const onDelete = item => {
    if (window.confirm(MESSAGE.CONFIRM_DELETE_ITEM)) {
      deleteCartItem(item);
    }
  };

  if (cartStatus === FAILURE) {
    return <>{MESSAGE.FAIL_FETCH_DATA}</>;
  }

  if (cartItems) {
    return (
      <Container>
        <Header>장바구니</Header>
        <Contents>
          <ProductListContainer>
            <ListOptionMenu aria-label="상품선택 옵션 메뉴">
              <CheckBox role="checkbox" aria-checked={isAllChecked}>
                <input
                  type="checkbox"
                  checked={isAllChecked ? true : false}
                  onChange={onCheckOptionChange}
                  hidden
                />
                <span></span>
                {checkOptionText}
              </CheckBox>
              <Button
                type="button"
                size="small"
                color={COLOR.BLACK}
                backgroundColor={COLOR.WHITE}
                borderColor={COLOR['GRAY-300']}
                onClick={() => {
                  onDeleteItems();
                }}
                disabled={checkedCount === 0}
              >
                상품 삭제
              </Button>
            </ListOptionMenu>
            <ProductListWrapper aria-label="장바구니 상품 목록">
              <ProductListHeader>배송상품 ({cartItems.length}개)</ProductListHeader>
              <ProductList>
                {cartItems.map(
                  ({ productId, cartId, name, imageUrl, price, quantity, checked }) => (
                    <ProductWrapper key={cartId}>
                      <CheckBox>
                        <input
                          type="checkbox"
                          onChange={() => onCheckBoxChange(productId)}
                          checked={checked}
                          hidden
                        />
                        <span
                          role="checkbox"
                          aria-label={`${name} 선택`}
                          aria-checked={checked}
                        ></span>
                      </CheckBox>
                      <Product
                        onClick={() => {
                          history.push(`${PATH.GOODS_DETAIL}?id=${productId}`);
                        }}
                        thumbnail={{ image: imageUrl, alt: name, size: 'small' }}
                        information={{ title: name }}
                        extra={
                          <>
                            <IconButton
                              type="button"
                              size="small"
                              onClick={() => onDelete({ productId, cartId })}
                              ariaLabel={`${name} 삭제`}
                            >
                              <TrashBin />
                            </IconButton>
                            <NumericInput
                              min={1}
                              max={99}
                              value={quantity}
                              setValue={onItemQuantityChange(productId)}
                              ariaLabel={`${name} 수량 변경`}
                            />
                            <div aria-label={`${name} 합산 가격`}>
                              {`${(price * quantity).toLocaleString('ko-KR')}원`}
                            </div>
                          </>
                        }
                      />
                    </ProductWrapper>
                  ),
                )}
              </ProductList>
            </ProductListWrapper>
          </ProductListContainer>
          <ReceiptWrapper>
            <ReceiptHeader>결제예상금액</ReceiptHeader>
            <ReceiptContent>
              <ReceiptRow>
                <HighlightText color={COLOR.HIGHLIGHT_MINT} fontSize="1.25rem">
                  결제예상금액
                </HighlightText>
                <HighlightText
                  color={COLOR.HIGHLIGHT_MINT}
                  fontSize="1.25rem"
                  ariaLabel="결제예상금액"
                >
                  {`${totalPrice.toLocaleString('ko-KR')}원`}
                </HighlightText>
              </ReceiptRow>

              <Button
                type="button"
                size="medium"
                disabled={!isPurchasable}
                onClick={() => {
                  history.push(PATH.ORDER);
                }}
              >
                {`주문하기(${checkedCount}개)`}
              </Button>
            </ReceiptContent>
          </ReceiptWrapper>
        </Contents>
      </Container>
    );
  }
};

export default Cart;
