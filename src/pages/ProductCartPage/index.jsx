import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import useCart from 'hooks/useCart';

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

import {calculateChecked} from 'utils';
import useCheckBox from 'hooks/useCheckBox';

export default function ProductCartPage() {
  const {data: cartList, getCartList} = useCart();
  const {checkedItemList, changeCheckedList, allChecked, deleteSelectedItems} =
    useCheckBox(cartList);

  let isAllChecked = cartList.length !== 0 && cartList.length === checkedItemList.length;

  useEffect(() => {
    getCartList();
  }, []);

  const checkedItems = cartList.filter(({id}) => checkedItemList.includes(id));
  const {totalQuantity, totalPrice} = calculateChecked(checkedItems);

  return (
    <ProductCartPageWrapper>
      <HeaderWrapper>장바구니</HeaderWrapper>
      <CartInfoWrapper>
        <SelectCartWrapper>
          <SelectDeleteWrapper>
            <CheckBoxWrapper>
              <CheckBox onChange={allChecked} checked={isAllChecked} />
              {`전체선택 ${checkedItemList.length}/${cartList.length}`}
            </CheckBoxWrapper>
            <Button buttonType="grayBorder" buttonSizeType="m" onClick={deleteSelectedItems}>
              선택 삭제
            </Button>
          </SelectDeleteWrapper>

          <ListHeaderWrapper>{`장바구니 상품 (${cartList.length}개)`}</ListHeaderWrapper>
          <CartListWrapper>
            {cartList.length === 0 && <div>장바구니에 담긴 상품이 없습니다</div>}
            {cartList.length !== 0 &&
              cartList.map(({image, name, price, quantity, id}) => (
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
