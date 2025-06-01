import { isValidImageUrl } from '../../../../utils/isValidImageUrl';
import IconButton from '../../../common/iconButton/IconButton';
import SelectBox from '../../../common/selectBox/SelectBox';
import Separator from '../../../common/separator/Separator';
import { deleteCartItem } from '../api/deleteCartItem';
import { updateCartItem } from '../api/updateCartItem';
import { CartItemType } from '../types';
import * as S from './CartItem.styles';
import defaultImage from '/assets/default_product.png';

interface CartItemProps {
  cartItem: CartItemType;
  selected: boolean;
  toggle: () => void;
  onUpdate: () => Promise<void>;
}

function CartItem({ cartItem, selected, toggle, onUpdate }: CartItemProps) {
  return (
    <S.Container data-testid={`CartItem-${cartItem.id}`}>
      <Separator />
      <S.ActionContainer>
        <SelectBox selected={selected} onClick={toggle} />
        <S.DeleteButton
          onClick={async () => {
            await deleteCartItem(cartItem.id);
            onUpdate();
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
              <IconButton
                actionType="delete"
                onClick={async () => {
                  await deleteCartItem(cartItem.id);
                  onUpdate();
                }}
              />
            ) : (
              <IconButton
                actionType="minus"
                onClick={async () => {
                  await updateCartItem(cartItem.id, cartItem.quantity - 1);
                  onUpdate();
                }}
              />
            )}
            <S.Text>{cartItem.quantity}</S.Text>
            <IconButton
              actionType="plus"
              onClick={async () => {
                await updateCartItem(cartItem.id, cartItem.quantity + 1);
                onUpdate();
              }}
            />
          </S.UpdateCartBox>
        </S.InfoBox>
      </S.InfoContainer>
    </S.Container>
  );
}

export default CartItem;
