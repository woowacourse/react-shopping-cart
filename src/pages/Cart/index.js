import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/shared/Button';
import HighlightText from '../../components/shared/HighlightText';
import NumericInput from '../../components/shared/NumericInput';
import Product from '../../components/shared/Product';
import IconButton from '../../components/shared/IconButton';
import { ReactComponent as TrashBin } from '../../assets/icons/trash-bin.svg';
import { COLOR, MESSAGE, PATH } from '../../constants';
import {
  setAllCartItemCheckbox,
  toggleCartItemCheckbox,
  setCartItemQuantity,
  deleteCartItems,
} from '../../store/cartReducer';
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
import { useHistory } from 'react-router';
import { API } from '../../utils';

const Cart = () => {
  const list = useSelector(state => state.cartReducer.cart);
  const dispatch = useDispatch();
  const history = useHistory();

  const checkedCount = list.filter(item => item.checked).length;
  const isAllChecked = checkedCount && checkedCount === list.length;
  const checkOptionText = isAllChecked
    ? '선택해제'
    : checkedCount
    ? `${checkedCount}개 선택`
    : '전체선택';

  const totalPrice = list
    .filter(item => item.checked)
    .reduce((total, item) => {
      const { price, quantity } = item;
      return total + price * quantity;
    }, 0);
  const isPurchasable = totalPrice > 0;

  const checkedItemIdList = list.filter(item => item.checked).map(({ id }) => id);

  const onCheckBoxChange = ({ id }) => {
    dispatch(toggleCartItemCheckbox(id));
  };

  const onCheckOptionChange = () => {
    dispatch(setAllCartItemCheckbox(isAllChecked));
  };

  const onItemQuantityChange = ({ id, quantity }) => {
    dispatch(setCartItemQuantity({ id, quantity }));
  };

  const onDelete = async idList => {
    if (window.confirm(MESSAGE.CONFIRM_DELETE_ITEM)) {
      await Promise.all(idList.map(id => API.deleteCartItem({ id })));
      dispatch(deleteCartItems(idList));
    }
  };

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
              onClick={() => onDelete(checkedItemIdList)}
              disabled={checkedCount === 0}
            >
              상품 삭제
            </Button>
          </ListOptionMenu>
          <ProductListWrapper aria-label="장바구니 상품 목록">
            <ProductListHeader>배송상품 ({list.length}개)</ProductListHeader>
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
                    <span role="checkbox" aria-label={`${name} 선택`} aria-checked={checked}></span>
                  </CheckBox>
                  <Product
                    onClick={() => {
                      history.push(`${PATH.GOODS_DETAIL}?id=${id}`);
                    }}
                    thumbnail={{ image: image, alt: name, size: 'small' }}
                    information={{ title: name }}
                    extra={
                      <>
                        <IconButton
                          type="button"
                          size="small"
                          onClick={() => onDelete([id])}
                          ariaLabel={`${name} 삭제`}
                        >
                          <TrashBin />
                        </IconButton>
                        <NumericInput
                          min={1}
                          max={99}
                          value={quantity}
                          setValue={quantity => onItemQuantityChange({ id, quantity })}
                          ariaLabel={`${name} 수량 변경`}
                        />
                        <div aria-label={`${name} 합산 가격`}>
                          {`${(price * quantity).toLocaleString('ko-KR')}원`}
                        </div>
                      </>
                    }
                  />
                </ProductWrapper>
              ))}
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
};

export default Cart;
