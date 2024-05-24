import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import CheckBox from '../../common/CheckBox/CheckBox';
import CartItem from '../CartItem/CartItem';
import type { TCartItem } from '../../../types/CartItem.type';
import { selectedCartItemListState } from '../../../recoil/CartItem/atoms/atoms';
import { removeCartItem, updateCartItemQuantity } from '../../../apis';
import * as S from './CartItemList.style';

interface CartItemListProps {
  cartItemList: TCartItem[];
  updateCartItemList: () => void;
}

function CartItemList({ cartItemList, updateCartItemList }: CartItemListProps) {
  const navigate = useNavigate();
  const [selectedItemList, setSelectedItemList] = useRecoilState(selectedCartItemListState);

  const isAllSelected = selectedItemList.length === cartItemList.length;

  const handleAllSelect = () => setSelectedItemList(isAllSelected ? [] : cartItemList);

  const handleUpdateQuantity = async (cartItemId: number, quantity: number) => {
    try {
      await updateCartItemQuantity(cartItemId, quantity);
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
      <CheckBox id="전체 선택" text="전체 선택" isChecked={isAllSelected} onChange={handleAllSelect} />
      {cartItemList.map((el) => (
        <CartItem key={el.id} item={el} onRemoveItem={handleRemoveItem} onUpdateQuantity={handleUpdateQuantity} />
      ))}
    </S.Layout>
  );
}

export default CartItemList;
