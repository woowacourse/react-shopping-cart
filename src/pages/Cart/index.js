import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAllCartItemCheckbox,
  toggleCartItemCheckbox,
  setCartItemQuantity,
  deleteCartItems,
  setCartItemList,
} from '../../store/cartReducer';
import API from '../../request/api';
import { Button, HighlightText, NumericInput, Product, IconButton } from '../../components/shared/';
import { COLOR, FETCH_URL, MESSAGE, PATH } from '../../constants';
import {
  Header,
  Contents,
  ListOptionMenu,
  ProductListContainer,
  ProductListHeader,
  ReceiptWrapper,
  ReceiptHeader,
  ReceiptContent,
  ReceiptRow,
  CheckBox,
} from './style';
import { ReactComponent as TrashBin } from '../../assets/icons/trash-bin.svg';
import useFetch from '../../request/useFetch';

const Cart = () => {
  const userName = useSelector(state => state.userReducer.name);
  const [cartList, getListError] = useFetch(FETCH_URL.GET_CART_ITEMS(userName));
  const [list, setList] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setList(cartList.map(item => ({ ...item, quantity: 1, checked: true })));
  }, [cartList]);

  if (getListError) {
    if (!userName) {
      alert('로그인이 필요한 서비스입니다.');
      return <Redirect to={PATH.MAIN} />;
    }
    return <>장바구니를 불러오는데 실패했습니다.</>;
  }

  const checkedItemIdList = list.filter(item => item.checked).map(({ cart_id }) => cart_id);
  const checkedCount = checkedItemIdList.length;
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

  const onCheckBoxChange = ({ cart_id }) => {
    dispatch(toggleCartItemCheckbox(cart_id));
  };

  const onCheckOptionChange = () => {
    dispatch(setAllCartItemCheckbox(isAllChecked));
  };

  const onItemQuantityChange = cart_id => quantity => {
    setList(
      list.map(item => {
        if (item.cart_id === cart_id) {
          item.quantity = quantity;
        }
        return item;
      }),
    );
    dispatch(setCartItemList(list));
    // dispatch(setCartItemQuantity({ cart_id, quantity }));
  };

  const onDelete = async idList => {
    if (window.confirm(MESSAGE.CONFIRM_DELETE_ITEM)) {
      try {
        await Promise.all(idList.map(id => API.deleteCartItem({ id })));
        dispatch(deleteCartItems(idList));
      } catch (error) {
        console.error(error);
        alert(MESSAGE.FAIL_DELETE_ITEM);
      }
    }
  };

  return (
    <>
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
          <ProductListHeader>배송상품 ({list.length}개)</ProductListHeader>
          <ul aria-label="장바구니 상품 목록">
            {list.map(({ cart_id, name, image_url, price, quantity, checked }) => (
              <li key={cart_id}>
                <CheckBox>
                  <input
                    type="checkbox"
                    onChange={() => onCheckBoxChange({ cart_id })}
                    checked={checked}
                    hidden
                  />
                  <span role="checkbox" aria-label={`${name} 선택`} aria-checked={checked}></span>
                </CheckBox>
                <Product
                  onTitleClick={() => {
                    history.push(`${PATH.GOODS_DETAIL}/${cart_id}`);
                  }}
                  thumbnail={{
                    image: image_url,
                    alt: name,
                    size: 'small',
                    onClick: () => {
                      history.push(`${PATH.GOODS_DETAIL}/${cart_id}`);
                    },
                  }}
                  information={{ title: name }}
                  extra={
                    <>
                      <IconButton
                        type="button"
                        size="small"
                        onClick={() => onDelete([cart_id])}
                        ariaLabel={`${name} 삭제`}
                      >
                        <TrashBin />
                      </IconButton>
                      <NumericInput
                        min={1}
                        max={99}
                        value={quantity}
                        setValue={onItemQuantityChange(cart_id)}
                        ariaLabel={`${name} 수량 변경`}
                      />
                      <div aria-label={`${name} 합산 가격`}>
                        {`${(price * quantity).toLocaleString('ko-KR')}원`}
                      </div>
                    </>
                  }
                />
              </li>
            ))}
          </ul>
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
    </>
  );
};

export default Cart;
