import styled from '@emotion/styled';
import type { ChangeEvent } from 'react';
import { useEffect, useRef } from 'react';
import { Text } from '../../common/Text/Text';
import { TrashCanIcon } from '../../../assets';
import InputStepper from '../../common/InputStepper/InputStepper';
import { CheckBox } from '../../list/CartList/CartList';
import type { CartItem } from '../../../types/types';
import { formatPrice } from '../../../utils/formatPrice';

interface CartListItemProps {
  cartItem: CartItem;
  checkedCartItemList: CartItem[];
  setCheckedCartItemList: React.Dispatch<React.SetStateAction<CartItem[]>>;
  updateProductQuantity: (id: number, quantity: number) => void;
  removeProductInCartList: (id: number) => void;
  handleCheckedCartItemList: (value: CartItem, isChecked: boolean) => void;
}

const CartListItem = (props: CartListItemProps) => {
  const {
    cartItem,
    checkedCartItemList,
    setCheckedCartItemList,
    handleCheckedCartItemList,
    removeProductInCartList,
    updateProductQuantity,
  } = props;

  const checkBoxRef = useRef<HTMLInputElement>(null);

  const handleSetQuantityOnInputStepper = (quantity: number) => {
    if (quantity < 1) return;

    updateProductQuantity(cartItem.id, quantity);

    if (checkBoxRef.current?.checked) {
      const newCartItem = { ...cartItem, quantity };

      const existcheckedCartItemIndex = checkedCartItemList.findIndex(
        (checkedCartItem) => checkedCartItem.id === cartItem.id,
      );

      if (existcheckedCartItemIndex !== -1) {
        const newCheckedCartItemList = checkedCartItemList.slice();
        newCheckedCartItemList.splice(existcheckedCartItemIndex, 1, newCartItem);
        setCheckedCartItemList(newCheckedCartItemList);
      }
    }
  };

  const handleRemoveProductInCartList = () => {
    removeProductInCartList(cartItem.id);

    setCheckedCartItemList((prev) =>
      prev.filter((checkedProduct) => checkedProduct.id !== cartItem.id),
    );
  };

  const handleOnCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    handleCheckedCartItemList(cartItem, e.target.checked);
  };

  useEffect(() => {
    if (checkBoxRef.current === null) return;
    if (checkedCartItemList.find((checkedCartItem) => checkedCartItem.id === cartItem.id)) {
      checkBoxRef.current.checked = true;
      return;
    }

    checkBoxRef.current.checked = false;
  }, [checkedCartItemList]);

  return (
    <CartListItemWrapper>
      <CheckBox ref={checkBoxRef} type="checkbox" onChange={handleOnCheckBox} />
      <CartItemImage src={cartItem.product.imageUrl} />
      <Text size="smallest" weight="light" color="#333333">
        {cartItem.product.name}
      </Text>
      <CartItemControllerWrapper>
        <TrashCanIcon
          width={24}
          height={24}
          cursor="pointer"
          onClick={handleRemoveProductInCartList}
        />
        <InputStepper
          size="big"
          quantity={cartItem.quantity}
          setQuantity={handleSetQuantityOnInputStepper}
        />
        <Text size="minimum" weight="light" color="#333333" label='price'>
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
