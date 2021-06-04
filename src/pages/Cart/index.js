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
    if (cartList) {
      const productIdList = new Set(cartList.map(item => item.product_id));
      const processedList = [...productIdList].map(id => {
        const targetCartItemList = cartList.filter(({ product_id }) => product_id === id);
        const [{ image_url: image, name, price }] = targetCartItemList;
        const targetCartIdList = targetCartItemList.map(({ cart_id }) => cart_id);

        return {
          productId: id,
          image,
          name,
          price,
          cartIdList: targetCartIdList,
          quantity: targetCartIdList.length,
          checked: true,
        };
      });

      setList(processedList);
    }
  }, [cartList]);

  if (getListError) {
    if (!userName) {
      alert('로그인이 필요한 서비스입니다.');
      return <Redirect to={PATH.MAIN} />;
    }
    return <>장바구니 불러오기를 실패했습니다.</>;
  }

  const checkedItemIdList = list.filter(item => item.checked).map(({ productId }) => productId);
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

  const onCheckBoxChange = ({ productId }) => {
    setList(
      list.map(item => {
        if (productId === item.productId) {
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

  const onItemQuantityChange = productId => quantity => {
    setList(
      list.map(item => {
        if (item.productId === productId) {
          item.quantity = quantity;
        }
        return item;
      }),
    );
  };

  const onDelete = async targetIdList => {
    const targetCartIdList = list
      .filter(({ productId }) => targetIdList.includes(productId))
      .map(({ cartIdList }) => cartIdList)
      .flat();

    if (window.confirm(MESSAGE.CONFIRM_DELETE_ITEM)) {
      try {
        await Promise.all(targetCartIdList.map(id => API.deleteCartItem({ id })));

        setList(list.filter(({ productId }) => !targetIdList.includes(productId)));
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
            {list.map(({ productId, name, image, price, quantity, checked }) => (
              <li key={productId}>
                <CheckBox>
                  <input
                    type="checkbox"
                    onChange={() => onCheckBoxChange({ productId })}
                    checked={checked}
                    hidden
                  />
                  <span role="checkbox" aria-label={`${name} 선택`} aria-checked={checked}></span>
                </CheckBox>
                <Product
                  onTitleClick={() => {
                    history.push(`${PATH.GOODS_DETAIL}/${productId}`);
                  }}
                  thumbnail={{
                    image,
                    alt: name,
                    size: 'small',
                    onClick: () => {
                      history.push(`${PATH.GOODS_DETAIL}/${productId}`);
                    },
                  }}
                  information={{ title: name }}
                  extra={
                    <>
                      <IconButton
                        type="button"
                        size="small"
                        onClick={() => onDelete([productId])}
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
