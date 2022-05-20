import Counter from '@/components/common/Counter/Counter';
import Icon from '@/components/common/Icon/Icon';
import Image from '@/components/common/Image/Image';
import { useCount } from '@/hooks/useCount';
import { useNavigate } from 'react-router-dom';
import * as Styled from './CartItem.style';
function CartItem({ cart }) {
  const { id, imageURL, name, price, quantity } = cart;
  const navigate = useNavigate();

  const { count, increaseCount, decreaseCount } = useCount({
    initialValue: quantity,
    min: 0,
    max: 100,
  });

  const navigateToProduct = e => {
    e.preventDefault();
    navigate(`/products/${id}`);
  };

  return (
    <Styled.Container>
      <Styled.ImageWrapper onClick={navigateToProduct}>
        <Image src={imageURL} alt="" />
      </Styled.ImageWrapper>
      <Styled.NameWrapper onClick={navigateToProduct}>{name}</Styled.NameWrapper>
      <Styled.PriceWrapper>
        <Icon iconName="recycleBin" color="#DDDDDD" clickable hoverColor="red" />
        <Counter count={count} increaseCount={increaseCount} decreaseCount={decreaseCount} />
        <Styled.Text>{price}원</Styled.Text>
      </Styled.PriceWrapper>
    </Styled.Container>
  );
}

export default CartItem;
