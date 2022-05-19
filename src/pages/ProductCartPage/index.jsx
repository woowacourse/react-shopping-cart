import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import useReducerSelect from 'hooks/useReducerSelect';
import {getCart, deleteCart} from 'store/modules/cart';

import CheckBox from 'components/common/CheckBox';
import Button from 'components/common/Button';
import AmountBox from 'components/AmountBox';
import CartItem from 'components/CartItem';

import {
  ProductCartPageWrapper,
  HeaderWrapper,
  CheckBoxWrapper,
  ListHeaderWrapper,
  CartListWrapper,
  SelectDeleteWrapper,
  CartInfoWrapper,
  SelectCartWrapper,
} from 'pages/ProductCartPage/style';

export default function ProductCartPage() {
  const [checkedItemList, setCheckedItemList] = useState([]);
  const {dispatch, pending, error, data: cartItem} = useReducerSelect('cartReducer');

  let isAllChecked = cartItem.length !== 0 && cartItem.length === checkedItemList.length;

  console.log('cartItem', cartItem, pending, error);
  console.log('체크된 리스트', checkedItemList);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const changeCheckedList = (id) => {
    // 이미 체크된 것이라면 체크 리스트에서 빼주고
    if (checkedItemList.find((checkedId) => checkedId === id)) {
      setCheckedItemList((prev) => prev.filter((itemId) => itemId !== id));
      return;
    }
    // 없은 아이디라면 체크 리스트에 넣어주고
    setCheckedItemList((prev) => [...prev, id]);
  };

  const allChecked = () => {
    const cartedId = cartItem.map(({id}) => id);

    // 체크 리스트의 길이가 카드의 길이와 같다면 -> 다 빼기
    if (checkedItemList.length === cartedId.length) {
      setCheckedItemList([]);
      return;
    }
    // 아니면 다 체크
    setCheckedItemList(cartedId);
  };

  const deleteSelectedItems = () => {
    if (confirm('선택된 상품들을 삭제하시겠습니까?')) {
      // 선택 상품 삭제
      checkedItemList.forEach((id) => {
        dispatch(deleteCart(id));
        changeCheckedList(id);
      });
    }
  };

  const {totalQuantity, totalPrice} = cartItem.reduce(
    (prev, cur) => {
      return {
        totalQuantity: cur.quantity + prev.totalQuantity,
        totalPrice: cur.price * cur.quantity + prev.totalPrice,
      };
    },
    {totalQuantity: 0, totalPrice: 0},
  );

  return (
    <ProductCartPageWrapper>
      <HeaderWrapper>장바구니</HeaderWrapper>
      <CartInfoWrapper>
        <SelectCartWrapper>
          <SelectDeleteWrapper>
            <CheckBoxWrapper>
              <CheckBox onChange={allChecked} checked={isAllChecked} />
              {isAllChecked ? '선택해제' : '전체선택'}
            </CheckBoxWrapper>
            <Button
              buttonType="grayBorder"
              width="117px"
              height="50px"
              onClick={deleteSelectedItems}
            >
              {isAllChecked ? '전체 상품 삭제' : '선택 상품 삭제'}
            </Button>
          </SelectDeleteWrapper>

          <ListHeaderWrapper>{`장바구니 상품 ${cartItem.length}(개)`}</ListHeaderWrapper>
          <CartListWrapper>
            {cartItem.map(({image, name, price, quantity, id}) => (
              <React.Fragment key={id}>
                <CartItem
                  itemImgURL={image}
                  itemName={name}
                  itemPrice={price}
                  quantity={quantity}
                  checked={checkedItemList.includes(id)}
                  id={id}
                  onChange={() => {
                    changeCheckedList(id);
                  }}
                />
                <hr />
              </React.Fragment>
            ))}
          </CartListWrapper>
        </SelectCartWrapper>

        <AmountBox type="cart" totalQuantity={totalQuantity} totalPrice={totalPrice} />
      </CartInfoWrapper>
    </ProductCartPageWrapper>
  );
}

ProductCartPage.propTypes = {
  itemImgURL: PropTypes.string,
  itemName: PropTypes.string,
  itemPrice: PropTypes.string,
};
