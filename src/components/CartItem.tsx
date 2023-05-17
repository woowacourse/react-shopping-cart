import { Image } from '../ui/Image';
import { Typography as ProductPrice } from '../ui/Typography';
import { CartCount } from './CartCount';
import { DeleteCartButton } from '../types/image';
import * as Styled from './styles/CartItem.styles';
import { CartItemProps } from '../types/CartItemType';
import { useCartState } from './hooks/useCartState';

export const CartItem = ({ id, imageUrl, name, price }: CartItemProps) => {
  const { quantity, increaseProductCount, decreaseProductCount } =
    useCartState(id);

  return (
    <Styled.Wrapper>
      <Styled.CheckboxInput type="checkbox" />
      <Image src={imageUrl} width="148px" height="180px" />
      <Styled.ProductName size="18px">{name}</Styled.ProductName>
      <Styled.CountInteractionWrapper>
        <DeleteCartButton />
        <CartCount
          quantity={quantity}
          handleDeleteCart={() => {
            return;
          }}
          increaseProductCount={increaseProductCount}
          decreaseProductCount={decreaseProductCount}
        />
        <ProductPrice>{`${(price * quantity).toLocaleString(
          'ko-KR'
        )} 원`}</ProductPrice>
      </Styled.CountInteractionWrapper>
    </Styled.Wrapper>
  );
};
