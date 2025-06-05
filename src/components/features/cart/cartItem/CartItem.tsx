import { showErrorToast } from '@/shared/toast/toastStore';
import { isValidImageUrl } from '../../../../utils/isValidImageUrl';
import SelectBox from '../../../common/selectBox/SelectBox';
import Separator from '../../../common/separator/Separator';
import { deleteCartItem } from '../api/deleteCartItem';
import { updateCartItem } from '../api/updateCartItem';
import CartQuantityControlButton from '../cartQuantityControlButton/CartQuantityControlButton';
import { CartItemType } from '../types';
import { handleCartActions } from '../utils/handleCartActions';
import * as S from './CartItem.styles';
import defaultImage from '/assets/default_product.png';

interface CartItemProps {
  cartItem: CartItemType;
  isSelected: boolean;
  toggleSelect: () => void;
  refetch: () => void;
}

function CartItem({
  cartItem,
  isSelected,
  toggleSelect,
  refetch,
}: CartItemProps) {
  return (
    <S.Container data-testid={`CartItem-${cartItem.id}`}>
      <Separator />
      <S.ActionContainer>
        <SelectBox selected={isSelected} onClick={toggleSelect} />
        <S.DeleteButton
          onClick={() => {
            handleCartActions(
              () => deleteCartItem(cartItem.id),
              refetch,
              () =>
                showErrorToast('상품 삭제에 실패했습니다. 다시 시도해주세요.')
            );
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
                  handleCartActions(
                    () => deleteCartItem(cartItem.id),
                    refetch,
                    () =>
                      showErrorToast(
                        '상품 삭제에 실패했습니다. 다시 시도해주세요.'
                      )
                  );
                }}
              />
            ) : (
              <CartQuantityControlButton
                actionType="minus"
                onClick={() => {
                  handleCartActions(
                    () => updateCartItem(cartItem.id, cartItem.quantity - 1),
                    refetch,
                    () => showErrorToast('상품 수량을 줄이는 데 실패했습니다.')
                  );
                }}
              />
            )}
            <S.Text>{cartItem.quantity}</S.Text>
            <CartQuantityControlButton
              actionType="plus"
              onClick={() => {
                handleCartActions(
                  () => updateCartItem(cartItem.id, cartItem.quantity + 1),
                  refetch,
                  () => showErrorToast('상품 수량을 늘리는 데 실패했습니다.')
                );
              }}
            />
          </S.UpdateCartBox>
        </S.InfoBox>
      </S.InfoContainer>
    </S.Container>
  );
}

export default CartItem;
