import { SelectBox, Separator } from '@/components/common';
import {
  isValidImageUrl,
  refetchData,
  showErrorToast,
  useJaeOMutation,
} from '@/shared';
import { deleteCartItem } from '../api/deleteCartItem';
import { updateCartItem } from '../api/updateCartItem';
import CartQuantityControlButton from '../cartQuantityControlButton/CartQuantityControlButton';
import { CartItemType } from '../types';
import * as S from './CartItem.styles';
import defaultImage from '/assets/default_product.png';

interface CartItemProps {
  cartItem: CartItemType;
  isSelected: boolean;
  toggleSelect: () => void;
}

function CartItem({ cartItem, isSelected, toggleSelect }: CartItemProps) {
  const { mutate: deleteCartItemMutate } = useJaeOMutation({
    mutationFn: deleteCartItem,
    options: {
      onSuccess: () => {
        refetchData('cartItems');
      },
      onError: () => {
        showErrorToast('상품 삭제에 실패했습니다. 다시 시도해주세요.');
      },
    },
  });
  const { mutate: updateCartItemMutate } = useJaeOMutation({
    mutationFn: updateCartItem,
    options: {
      onSuccess: () => {
        refetchData('cartItems');
      },
      onError: () => {
        showErrorToast('상품 수량 업데이트에 실패했습니다. 다시 시도해주세요.');
      },
    },
  });

  return (
    <S.Container data-testid={`CartItem-${cartItem.id}`}>
      <Separator />
      <S.ActionContainer>
        <SelectBox selected={isSelected} onClick={toggleSelect} />
        <S.DeleteButton
          onClick={() => {
            deleteCartItemMutate(cartItem.id);
          }}
        >
          <S.DeleteButtonText>삭제</S.DeleteButtonText>
        </S.DeleteButton>
      </S.ActionContainer>
      <S.InfoContainer>
        <S.PreviewBox>
          <S.PreviewImage
            src={
              isValidImageUrl(cartItem.product.imageUrl)
                ? cartItem.product.imageUrl
                : defaultImage
            }
            alt="상품 이미지"
          />
        </S.PreviewBox>
        <S.InfoBox>
          <S.CartProductInfo>
            <S.CartProductTitle>{cartItem.product.name}</S.CartProductTitle>
            <S.CartProductPrice>
              {`${(
                cartItem.product.price * cartItem.quantity
              ).toLocaleString()}원`}
            </S.CartProductPrice>
          </S.CartProductInfo>
          <S.UpdateCartBox>
            {cartItem.quantity === 1 ? (
              <CartQuantityControlButton
                actionType="delete"
                onClick={() => {
                  deleteCartItemMutate(cartItem.id);
                }}
              />
            ) : (
              <CartQuantityControlButton
                actionType="minus"
                onClick={() => {
                  updateCartItemMutate({
                    id: cartItem.id,
                    quantity: cartItem.quantity - 1,
                  });
                }}
              />
            )}
            <S.Text>{cartItem.quantity}</S.Text>
            <CartQuantityControlButton
              actionType="plus"
              onClick={() => {
                updateCartItemMutate({
                  id: cartItem.id,
                  quantity: cartItem.quantity + 1,
                });
              }}
            />
          </S.UpdateCartBox>
        </S.InfoBox>
      </S.InfoContainer>
    </S.Container>
  );
}

export default CartItem;
