import IconButton from '../../../common/iconButton/IconButton';
import SelectBox from '../../../common/selectBox/SelectBox';
import Separator from '../../../common/separator/Separator';
import { CartItemType } from '../types';
import * as S from './CartItem.styles';

interface CartItemProps {
  cartItem: CartItemType;
  isSelected: boolean;
  toggleSelect: () => void;
}

function CartItem({ cartItem, isSelected, toggleSelect }: CartItemProps) {
  return (
    <S.Container>
      <Separator />
      <S.ActionContainer>
        <SelectBox isSelected={isSelected} onClick={toggleSelect} />
        <S.DeleteButton>
          <S.DeleteButtonText>삭제</S.DeleteButtonText>
        </S.DeleteButton>
      </S.ActionContainer>
      <S.InfoContainer>
        <S.PreviewBox>
          <S.PreviewImage src={cartItem.product.imageUrl} alt="상품 이미지" />
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
            {/* {cartCount === 1 ? (
            <IconButton actionType="delete" onClick={() => {}} />
          ) : ( */}
            <IconButton actionType="minus" onClick={() => {}} />
            {/* )} */}
            <S.Text>{cartItem.quantity}</S.Text>
            <IconButton actionType="plus" onClick={() => {}} />
          </S.UpdateCartBox>
        </S.InfoBox>
      </S.InfoContainer>
    </S.Container>
  );
}

export default CartItem;
