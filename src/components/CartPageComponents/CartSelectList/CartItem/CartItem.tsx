import * as Styled from './CartItem.styles.tsx';
import StepperInput from '../../StepperInput/StepperInput.tsx';
import { Item } from '../../../../types/CartList.ts';
import useCart from '../../../../hooks/useCart.ts';
import useDeleteProduct from '../../../../hooks/requests/useDeleteProduct.ts';

type CartItemProps = {
  cart: Item;
  refetchCartList: ({}) => void;
};

const CartItem = ({ cart, refetchCartList }: CartItemProps) => {
  const { itemInfo } = cart;
  const { removeCartItem, toggleIsSelected, cartList } = useCart();
  const [_, deleteProduct] = useDeleteProduct();

  const handleDeleteButton = async () => {
    await Promise.all([deleteProduct(cart.id), removeCartItem(cart.id)]);
    refetchCartList({});
  };

  const handleCheckBox = () => {
    toggleIsSelected(cart.id);
  };

  const isSelected = cartList?.items.find((item) => item.id === cart.id)?.isSelected;

  return (
    <>
      {cart && (
        <>
          <ul>
            <Styled.CartItem>
              <Styled.CartItemCheckBox type='checkbox' checked={isSelected} onChange={handleCheckBox} />
              <Styled.ItemImageOverflowContainer>
                <Styled.ItemImageContainer>
                  <Styled.ItemImage src={itemInfo.imageUrl} />
                </Styled.ItemImageContainer>
              </Styled.ItemImageOverflowContainer>
              <Styled.ItemTitle>{itemInfo.name}</Styled.ItemTitle>

              <Styled.itemFunctionWrapper>
                <Styled.DeleteButton onClick={handleDeleteButton}>
                  <Styled.TrashLogo />
                </Styled.DeleteButton>
                <StepperInput initialValue={cart.quantity} cartItem={cart} />
                <span>{itemInfo.price.toLocaleString()}원</span>
              </Styled.itemFunctionWrapper>
            </Styled.CartItem>
          </ul>
          <Styled.CartItemBorder />
        </>
      )}
    </>
  );
};

export default CartItem;
