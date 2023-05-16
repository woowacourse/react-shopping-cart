import { styled } from 'styled-components';
import ProductImg from '../ProductCard/ProductImg/ProductImg';
import { ReactComponent as TrashCan } from '../../assets/icon/trash-can.svg';
import Counter from '../common/Counter/Counter';
import CheckBox from '../common/CheckBox/CheckBox';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { cartAtomFamily, cartListAtom } from '../../store/cart';
import { Select } from '../CartItemList/CartItemList';

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
  const setCartList = useSetRecoilState(cartListAtom);
  const [productInCart, setProductInCart] = useRecoilState(cartAtomFamily(id));
  const resetProductInCart = useResetRecoilState(cartAtomFamily(id));

  const { name, imageUrl, price } = productInCart.product;

  const plusOne = () => {
    setProductInCart((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  };

  const minusOne = () => {
    setProductInCart((prev) => ({
      ...prev,
      quantity: prev.quantity - 1,
    }));

    if (productInCart.quantity <= 1) {
      setCartList((prev) => prev.filter((item) => item !== id));
      resetProductInCart();
      return;
    }
  };

  if (cartItemState.isDeleted) {
    resetProductInCart();
    setCartList((prev) => prev.filter((productid) => productid !== id));
    setCartItemsState((prev) =>
      prev.filter((item) => item.isDeleted === false)
    );
  }

  const deleteCartItem = () => {
    setCartList((prev) => prev.filter((item) => item !== id));
    resetProductInCart();
  };

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
        <DeleteButton onClick={deleteCartItem}>
          <TrashCan />
        </DeleteButton>
        <CounterWrapper>
          <Counter
            plusOne={plusOne}
            minusOne={minusOne}
            quantity={productInCart.quantity}
          />
        </CounterWrapper>
        <Price>{(price * productInCart.quantity).toLocaleString()}원</Price>
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
