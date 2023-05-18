import { styled } from 'styled-components';
import ProductImg from '../ProductCard/ProductImg/ProductImg';
import { ReactComponent as TrashCan } from '../../assets/icon/trash-can.svg';
import Counter from '../common/Counter/Counter';
import CheckBox from '../common/CheckBox/CheckBox';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Select } from '../CartItemList/CartItemList';
import { useState } from 'react';
import { updateCartItem, deleteCartItem } from '../../api/cartList';
import { cartAtom, cartSelectorFamily } from '../../store/cart';

interface CartItemProps {
  id: number;
  cartItemState: Select;
  setCartItemsState: React.Dispatch<React.SetStateAction<Select[]>>;
  setIsAllSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartItem = ({
  id,
  cartItemState,
  setCartItemsState,
  setIsAllSelected,
}: CartItemProps) => {
  const productInCart = useRecoilValue(cartSelectorFamily(id));
  const { quantity, product } = productInCart;
  const { name, imageUrl, price } = product;
  const [count, setCount] = useState(quantity);
  const setCart = useSetRecoilState(cartAtom);

  const plusOne = () => {
    setCount(count + 1);
    updateCartItem(id, count + 1);
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { id, quantity: count + 1, product: { id, name, price, imageUrl } }
          : item
      )
    );
  };

  const minusOne = () => {
    if (count - 1 === 0) {
      setCount(1);
      return;
    }
    setCount(count - 1);
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { id, quantity: count - 1, product: { id, name, price, imageUrl } }
          : item
      )
    );
  };

  if (cartItemState.isDeleted) {
    setCartItemsState((prev) =>
      prev.filter((item) => item.isDeleted === false)
    );
  }

  const toggleSelect = () => {
    setIsAllSelected(false);

    setCartItemsState((prev) => [
      ...prev.filter((item) => item.id !== id),
      { ...cartItemState, isSelected: !cartItemState.isSelected },
    ]);
  };

  return (
    <Wrapper>
      <CheckBoxWrapper>
        <CheckBox checked={cartItemState.isSelected} onClick={toggleSelect} />
      </CheckBoxWrapper>

      <ProductImg
        imageUrl={imageUrl}
        size={{ width: '144px', height: '144px' }}
      />

      <DetailWrapper>
        <ProductName>{name}</ProductName>
        <DeleteButton
          onClick={() => {
            deleteCartItem(id);
            setCart((prev) => [...prev.filter((item) => item.id !== id)]);
          }}>
          <TrashCan />
        </DeleteButton>
        <CounterWrapper>
          <Counter plusOne={plusOne} minusOne={minusOne} quantity={count} />
        </CounterWrapper>
        <Price>{(price * count).toLocaleString()}원</Price>
      </DetailWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.li`
  display: flex;
  align-items: center;

  width: 680px;
  height: 160px;
`;

const CheckBoxWrapper = styled.div`
  height: 100%;

  padding: 8px 12px;
`;

const ProductName = styled.span``;

const DetailWrapper = styled.div`
  position: relative;

  flex: 1;
  height: 100%;

  padding: 12px;
`;

const DeleteButton = styled.button`
  position: absolute;

  top: 12px;
  right: 12px;
`;

const CounterWrapper = styled.div`
  position: absolute;

  top: 64px;
  right: 12px;
`;

const Price = styled.span`
  position: absolute;

  bottom: 12px;
  right: 12px;
`;
export default CartItem;
