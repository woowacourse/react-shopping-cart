import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { removeCartItem, updateCartItemQuantity } from '../../../apis';
import { selectedCartItemListState } from '../../../recoil/CartItem/atoms/selectedCartItemListState';
import CheckButton from '../../Button/CheckButton/CheckButton';
import CartItemContainer from '../../Container/CartItemContainer/CartItemContainer';
import * as S from './CartItemList.style';

import type { CartItem } from '../../../types/CartItem';

interface CartItemListProps {
  cartItemList: CartItem[];
}

function CartItemList({ cartItemList }: CartItemListProps) {
  const [selectedItemList, setSelectedItemList] = useRecoilState(selectedCartItemListState);

  const isAllSelected = selectedItemList.length === cartItemList.length;

  const navigate = useNavigate();

  const handleAllSelect = () => {
    setSelectedItemList(isAllSelected ? [] : cartItemList);
  };

  const handleUpdateQuantity = async (cartItemId: number, quantity: number) => {
    try {
      await updateCartItemQuantity(cartItemId, quantity);
    } catch (error) {
      navigate('/error', { state: { errorType: 'UPDATE' } });
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    try {
      await removeCartItem(cartItemId);
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
        <CartItemContainer
          key={el.id}
          item={el}
          onRemoveItem={handleRemoveItem}
          onUpdateQuantity={handleUpdateQuantity}
        />
      ))}
    </S.Layout>
  );
}

export default CartItemList;
