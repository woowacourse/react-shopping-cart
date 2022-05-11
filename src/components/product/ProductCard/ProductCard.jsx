import Image from '../../common/Image/Image';
import * as Styled from './ProductCard.style';
import Icon from '../../common/Icon';
function ProductCard({ product: { imageURL, name, price } }) {
  return (
    <Styled.Container>
      <Image src={imageURL} alt={name} />
      <Styled.Content>
        <Styled.Description>
          <Styled.Name>{name}</Styled.Name>
          <Styled.Price>{price}원</Styled.Price>
        </Styled.Description>
        <Styled.TransparentButton type="button">
          <Icon iconName="cart" />
        </Styled.TransparentButton>
      </Styled.Content>
    </Styled.Container>
  );
}

export default ProductCard;
