import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import useReducerSelect from 'hooks/useReducerSelect';
import {getCart} from 'store/modules/cart';

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
  const {dispatch, pending, error, data: cartItem} = useReducerSelect('cartReducer');

  console.log(cartItem, pending, error);
  useEffect(() => {
    dispatch(getCart());
  }, []);
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
              <CheckBox />
              선택해제
            </CheckBoxWrapper>
            <Button buttonType="grayBorder" width="117px" height="50px">
              상품삭제
            </Button>
          </SelectDeleteWrapper>

          <ListHeaderWrapper>{`장바구니 상품 ${cartItem.length}(개)`}</ListHeaderWrapper>
          <CartListWrapper>
            {cartItem.map(({image, name, price, quantity, checked, id}) => (
              <React.Fragment key={id}>
                <CartItem
                  itemImgURL={image}
                  itemName={name}
                  itemPrice={price}
                  quantity={quantity}
                  checked={checked}
                  id={id}
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
