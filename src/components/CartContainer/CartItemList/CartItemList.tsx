import * as styled from './CartItemList.styled';
import { Checkbox } from '../../styled/Checkbox';

import { useCartItems, useCartRepository } from '../../../recoils/recoilCart';

import { DeleteIcon } from '../../../assets/svg';
import { Stepper } from '../../common/Stepper/Stepper';

import { CartItemType } from '../../../types';

export const CartItemList = () => {
  const cartItems = useCartItems();

  const { deleteCartItem, toggleCheckbox } = useCartRepository();

  const onChangeCheckBox = (id: CartItemType['id']) => {
    toggleCheckbox(id);
  };

  const onClickDeleteIcon = (id: CartItemType['id']) => {
    deleteCartItem(id);
  };

  return (
    <styled.CartItemList>
      {cartItems.map(({ id, quantity, product, checked }) => (
        <styled.CartItem key={id}>
          <styled.CartInfo>
            <styled.LeftInfo>
              <Checkbox type="checkbox" checked={checked} onChange={() => onChangeCheckBox(id)} />
              <styled.ProductImage path={product.imageUrl} />
              <styled.ProductName>{product.name}</styled.ProductName>
            </styled.LeftInfo>
            <styled.RightInfo>
              <Stepper cartId={id} quantity={quantity} />
              <styled.ProductPrice>{product.price.toLocaleString('ko-KR')}원</styled.ProductPrice>
              <styled.DeleteButton onClick={() => onClickDeleteIcon(id)}>
                <DeleteIcon />
              </styled.DeleteButton>
            </styled.RightInfo>
          </styled.CartInfo>
          <styled.TotalPrice>
            상품금액 {(product.price * quantity).toLocaleString('ko-kr')}원 =&nbsp;
            <span>총 {(product.price * quantity).toLocaleString('ko-kr')}원</span>
          </styled.TotalPrice>
        </styled.CartItem>
      ))}
    </styled.CartItemList>
  );
};
