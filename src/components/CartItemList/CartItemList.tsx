import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { removeCartItem, updateCartItemQuantity } from '../../apis';
import { selectedCartItemListState } from '../../pages/ShoppingCartPage/recoil/atom/selectedCartItemListState';
import CheckButton from '../Button/CheckButton/CheckButton';
import CartItem from '../CartItem/CartItem';
import * as S from './CartItemList.style';

import type { TCartItem } from '../../types/CartItem';
interface CartItemListProps {
  cartItemList: TCartItem[];
  updateCartItemList: () => void;
}

function CartItemList({ cartItemList, updateCartItemList }: CartItemListProps) {
  const [selectedItemList, setSelectedItemList] = useRecoilState(selectedCartItemListState);

  const isAllSelected = selectedItemList.length === cartItemList.length;

  const navigate = useNavigate();

  const handleAllSelect = () => {
    setSelectedItemList(isAllSelected ? [] : cartItemList);
  };

  const handleUpdateQuantity = async (cartItemId: number, quantity: number) => {
    try {
      await updateCartItemQuantity(cartItemId, quantity);
      updateCartItemList();
    } catch (error) {
      navigate('/error', { state: { errorType: 'UPDATE' } });
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    try {
      await removeCartItem(cartItemId);
      updateCartItemList();
    } catch (error) {
      navigate('/error', { state: { errorType: 'REMOVE' } });
    }
  };

  return (
    <S.Layout>
      <S.SelectAllButtonContainer>
        <CheckButton isChecked={isAllSelected} onClick={handleAllSelect} />
        <p>전체 선택</p>
      </S.SelectAllButtonContainer>
      {cartItemList.map((el) => (
        <CartItem key={el.id} item={el} onRemoveItem={handleRemoveItem} onUpdateQuantity={handleUpdateQuantity} />
      ))}
    </S.Layout>
  );
}

export default CartItemList;
