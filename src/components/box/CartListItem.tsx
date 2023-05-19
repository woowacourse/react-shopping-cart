import styled from '@emotion/styled';
import type { ChangeEvent } from 'react';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { Text } from '../common/Text/Text';
import { TrashCanIcon } from '../../assets';
import InputStepper from '../common/InputStepper/InputStepper';
import { CheckBox } from '../list/CartList';
import type { CartItem } from '../../types/types';
import { formatPrice } from '../../utils/formatPrice';
import { checkedArrayState } from '../../recoil/atom';

const CartListItem = ({
  cartItem,
  updateProductQuantity,
  handleCheckedProductArray,
}: {
  cartItem: CartItem;
  updateProductQuantity: (id: number, quantity: number) => void;
  handleCheckedProductArray: (isChecked: boolean, value: CartItem) => void;
}) => {
  const checkedProductArray = useRecoilValue(checkedArrayState);
  const checkBoxRef = useRef<HTMLInputElement>(null);

  const handleSetQuantityOnInputStepper = (quantity: number) => {
    if (quantity < 1) return;

    updateProductQuantity(cartItem.id, quantity);
  };

  const handleOnCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    handleCheckedProductArray(e.target.checked, cartItem);
  };

  useEffect(() => {
    if (checkBoxRef.current === null) return;
    if (checkedProductArray.find((checkedProduct) => checkedProduct.id === cartItem.id)) {
      checkBoxRef.current.checked = true;
      return;
    }

    checkBoxRef.current.checked = false;
  }, [checkedProductArray]);

  return (
    <CartListItemWrapper>
      <CheckBox ref={checkBoxRef} type="checkbox" onChange={handleOnCheckBox} />
      <CartItemImage src={cartItem.product.imageUrl} />
      <Text size="smallest" weight="light" color="#333333">
        {cartItem.product.name}
      </Text>
      <CartItemControllerWrapper>
        <TrashCanIcon width={24} height={24} cursor="pointer" />
        <InputStepper
          size="big"
          quantity={cartItem.quantity}
          setQuantity={handleSetQuantityOnInputStepper}
        />
        <Text size="minimum" weight="light" color="#333333">
          {formatPrice(cartItem.product.price)}원
        </Text>
      </CartItemControllerWrapper>
    </CartListItemWrapper>
  );
};

export default CartListItem;

const CartListItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  height: 203px;
  padding: 20px 10px;
  border-top: 1px solid #cccccc;
`;

const CartItemImage = styled.img`
  width: 144px;
  height: 147px;
`;

const CartItemControllerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  width: 144px;
  height: 147px;
`;
