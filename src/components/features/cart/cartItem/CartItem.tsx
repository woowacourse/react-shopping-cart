import { isValidImageUrl } from '../../../../utils/isValidImageUrl';
import IconButton from '../../../common/iconButton/IconButton';
import SelectBox from '../../../common/selectBox/SelectBox';
import Separator from '../../../common/separator/Separator';
import useCartMutations from '../hooks/useCartMutations';
import { CartItemType } from '../types';
import * as S from './CartItem.styles';
import defaultImage from '/assets/default_product.png';

interface CartItemProps extends CartItemType {
  selected: boolean;
  toggle: () => void;
}

function CartItem({ id, product, quantity, selected, toggle }: CartItemProps) {
  const { remove, increase, decrease } = useCartMutations(id);
  return (
    <S.Container data-testid={`CartItem-${id}`}>
      <Separator />
      <S.ActionContainer>
        <SelectBox selected={selected} onClick={toggle} />
        <S.DeleteButton
          onClick={async () => {
            remove();
          }}
        >
          <S.DeleteButtonText>삭제</S.DeleteButtonText>
        </S.DeleteButton>
      </S.ActionContainer>
      <S.InfoContainer>
        <S.PreviewBox>
          <S.PreviewImage
            src={
              isValidImageUrl(product.imageUrl)
                ? product.imageUrl
                : defaultImage
            }
            alt="상품 이미지"
          />
        </S.PreviewBox>
        <S.InfoBox>
          <S.CartProductInfo>
            <S.CartProductTitle>{product.name}</S.CartProductTitle>
            <S.CartProductPrice>
              {`${(product.price * quantity).toLocaleString()}원`}
            </S.CartProductPrice>
          </S.CartProductInfo>
          <S.UpdateCartBox>
            {quantity === 1 ? (
              <IconButton
                actionType="delete"
                onClick={async () => {
                  remove();
                }}
              />
            ) : (
              <IconButton
                actionType="minus"
                onClick={async () => {
                  decrease(quantity);
                }}
              />
            )}
            <S.Text>{quantity}</S.Text>
            <IconButton
              actionType="plus"
              onClick={async () => {
                increase(quantity);
              }}
            />
          </S.UpdateCartBox>
        </S.InfoBox>
      </S.InfoContainer>
    </S.Container>
  );
}

export default CartItem;
