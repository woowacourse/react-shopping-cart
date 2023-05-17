import { useState } from 'react';
import { Image } from '../ui/Image';
import { Typography as ProductPrice } from '../ui/Typography';
import { CartCount } from './CartCount';
import { DeleteCartButton } from '../types/image';
import * as Styled from './styles/CartItem.styles';
import { CartItemProps } from '../types/CartItemType';

export const CartItem = ({
  id,
  imageUrl,
  name,
  price,
  quantity,
}: CartItemProps) => {
  const [itemQuantity, setItemQuantity] = useState(quantity);

  return (
    <Styled.Wrapper>
      <Styled.CheckboxInput type="checkbox" />
      <Image src={imageUrl} width="148px" height="180px" />
      <Styled.ProductName size="18px">{name}</Styled.ProductName>
      <Styled.CountInteractionWrapper>
        <DeleteCartButton />
        <CartCount
          quantity={itemQuantity}
          handleDeleteCart={() => {
            return;
          }}
          increaseProductCount={() => {
            return;
          }}
          decreaseProductCount={() => {
            return;
          }}
        />
        <ProductPrice>{`${(price * quantity).toLocaleString(
          'ko-KR'
        )} 원`}</ProductPrice>
      </Styled.CountInteractionWrapper>
    </Styled.Wrapper>
  );
};
