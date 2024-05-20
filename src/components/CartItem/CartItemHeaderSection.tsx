import { css } from '@emotion/react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import Button from '../common/Button';

import LocalStorage, { CART_ITEM } from '@/Storage';
import { deleteItem } from '@apis/cartItem';
import Checkbox from '@components/common/Checkbox';
import { cartItemsState, checkedItemsState } from '@recoil/cartItems/atoms';

interface CartItemHeaderSectionProps {
  cartId: number;
  productName: string;
}

const CartItemHeaderSection = ({ cartId, productName }: CartItemHeaderSectionProps) => {
  const [isChecked, setIsChecked] = useRecoilState(checkedItemsState(cartId));
  const setCartItems = useSetRecoilState(cartItemsState);

  const handleClickCheck = () => {
    setIsChecked((prev) => !prev);
    LocalStorage.addData(CART_ITEM, cartId, !isChecked);
  };

  const handleDeleteItem = async () => {
    setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem.id !== cartId));
    await deleteItem(cartId);
    LocalStorage.deleteData(CART_ITEM, cartId);
  };

  return (
    <div css={cartItemHeader}>
      <Checkbox
        checked={isChecked}
        onChange={handleClickCheck}
        id={productName + 'checkbox'}
        description={productName + 'checkbox'}
        labelHidden={true}
      />
      <Button id={productName + 'delete-button'} css={deleteButton} onClick={handleDeleteItem}>
        삭제
      </Button>
    </div>
  );
};

export default CartItemHeaderSection;

const cartItemHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const deleteButton = css`
  width: 40px;
  height: 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid #0000001a;
  border-radius: 4px;
  padding: 4px 8px;

  background-color: #fff;

  font-size: 12px;

  &:hover {
    opacity: 0.7;
  }
`;
