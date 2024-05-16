import { css } from '@emotion/react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { deleteItem } from '../../apis/cartItem';
import { CHECKED, UNCHECKED } from '../../assets/images';
import LocalStorage, { CART_ITEM } from '../../Storage';

import { cartItemsState, checkedItemsState } from '@recoil/cartItems/atoms';

interface CartItemHeaderSectionProps {
  cartId: number;
}

const CartItemHeaderSection = ({ cartId }: CartItemHeaderSectionProps) => {
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
      <div onClick={handleClickCheck}>
        <img src={isChecked ? CHECKED : UNCHECKED} width={24} height={24} css={checkIcon} />
      </div>
      <button css={deleteButton} onClick={handleDeleteItem}>
        삭제
      </button>
    </div>
  );
};

export default CartItemHeaderSection;

const cartItemHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 10px;
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
`;

const checkIcon = css`
  cursor: pointer;
`;
