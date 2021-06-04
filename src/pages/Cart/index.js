import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import useFetch from '../../hooks/useFetch';
import API from '../../request/api';
import { setCartItemList } from '../../store/cartReducer';
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
    return <>장바구니 불러오기를 실패했습니다.</>;
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
    setList(
      list.map(item => {
        if (cart_id === item.cart_id) {
          return {
            ...item,
            checked: !item.checked,
          };
        }
        return item;
      }),
    );
  };

  const onCheckOptionChange = () => {
    setList(
      list.map(item => ({
        ...item,
        checked: isAllChecked ? false : true,
      })),
    );
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
  };

  const onDelete = async idList => {
    if (window.confirm(MESSAGE.CONFIRM_DELETE_ITEM)) {
      try {
        await Promise.all(idList.map(id => API.deleteCartItem({ id })));

        setList(list.filter(({ cart_id }) => idList.includes(cart_id) === false));
      } catch (error) {
        console.error(error);
        alert(MESSAGE.FAIL_DELETE_ITEM);
      }
    }
  };

  const onOrder = () => {
    dispatch(setCartItemList(list));
    history.push(PATH.ORDER);
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
            {list.map(({ cart_id: id, name, image_url: image, price, quantity, checked }) => (
              <li key={id}>
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
                  thumbnail={{
                    image,
                    alt: name,
                    size: 'small',
                  }}
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
                        setValue={onItemQuantityChange(id)}
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

            <Button type="button" size="medium" disabled={!isPurchasable} onClick={onOrder}>
              {`주문하기(${checkedCount}개)`}
            </Button>
          </ReceiptContent>
        </ReceiptWrapper>
      </Contents>
    </>
  );
};

export default Cart;
