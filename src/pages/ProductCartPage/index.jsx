import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

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
import useCart from 'hooks/useCart';

import {calculateChecked} from 'utils';
import {MESSAGE} from 'constants';

export default function ProductCartPage() {
  const [checkedItemList, setCheckedItemList] = useState([]);
  const {data: cartItem, getCartList, deleteItem} = useCart();

  let isAllChecked = cartItem.length !== 0 && cartItem.length === checkedItemList.length;

  useEffect(() => {
    getCartList();
  }, []);

  const changeCheckedList = (id) => {
    // 이미 체크된 것이라면 체크 리스트에서 빼주고
    if (checkedItemList.find((checkedId) => checkedId === id)) {
      setCheckedItemList((prev) => prev.filter((itemId) => itemId !== id));
      return;
    }
    // 없는 아이디라면 체크 리스트에 넣어주고
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
    if (checkedItemList.length === 0) {
      return alert(MESSAGE.NO_SELECTED_ITEM);
    }
    if (confirm(MESSAGE.DELETE_SELECTED_ITEMS)) {
      checkedItemList.forEach((id) => {
        deleteItem(id);
        changeCheckedList(id);
      });
    }
  };

  const checkedItems = cartItem.filter(({id}) => checkedItemList.includes(id));
  const {totalQuantity, totalPrice} = calculateChecked(checkedItems);

  return (
    <ProductCartPageWrapper>
      <HeaderWrapper>장바구니</HeaderWrapper>
      <CartInfoWrapper>
        <SelectCartWrapper>
          <SelectDeleteWrapper>
            <CheckBoxWrapper>
              <CheckBox onChange={allChecked} checked={isAllChecked} />
              {`전체선택 ${checkedItemList.length}/${cartItem.length}`}
            </CheckBoxWrapper>
            <Button buttonType="grayBorder" buttonSizeType="m" onClick={deleteSelectedItems}>
              선택 삭제
            </Button>
          </SelectDeleteWrapper>

          <ListHeaderWrapper>{`장바구니 상품 (${cartItem.length}개)`}</ListHeaderWrapper>
          <CartListWrapper>
            {cartItem.length === 0 && <div>장바구니에 담긴 상품이 없습니다</div>}
            {cartItem.length !== 0 &&
              cartItem.map(({image, name, price, quantity, id}) => (
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
