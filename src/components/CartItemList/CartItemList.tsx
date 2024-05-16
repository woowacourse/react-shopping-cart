import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import CheckButton from '../Button/CheckButton/CheckButton';
import CartItem from '../CartItem/CartItem';
import type { TCartItem } from '../../types/CartItem.type';
import { selectedCartItemListState } from '../../recoil/atoms/atoms';
import { removeCartItem, updateCartItemQuantity } from '../../apis';
import * as S from './CartItemList.style';

interface CartItemListProps {
  cartItemList: TCartItem[];
  updateCartItemList: () => void;
}

function CartItemList({ cartItemList, updateCartItemList }: CartItemListProps) {
  const navigate = useNavigate();
  const [selectedItemList, setSelectedItemList] = useRecoilState(selectedCartItemListState);

  const isAllSelected = selectedItemList.length === cartItemList.length;

  const handleAllSelect = () => {
    if (isAllSelected) setSelectedItemList([]);
    else setSelectedItemList(cartItemList);
  };

  const handleUpdateQuantity = async (cardItemId: number, quantity: number) => {
    try {
      await updateCartItemQuantity(cardItemId, quantity);
      updateCartItemList();
    } catch {
      navigate('/error');
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    try {
      await removeCartItem(cartItemId);
      updateCartItemList();
    } catch {
      navigate('/error');
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
