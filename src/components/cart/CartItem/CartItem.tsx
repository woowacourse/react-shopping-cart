import Button from '@/components/common/Button/Button';
import Counter from '@/components/common/Counter/Counter';
import Icon from '@/components/common/Icon/Icon';
import Image from '@/components/common/Image/Image';
import { useCount } from '@/hooks/useCount';
import { fetchDeleteCartAsync, fetchPatchCartAsync } from '@/store/cart/action';
import theme from '@/styles/Theme';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Styled from './CartItem.style';
function CartItem({ cart }) {
  const { id, imageURL, name, price, quantity } = cart;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { count, increaseCount, decreaseCount } = useCount({
    initialValue: quantity,
    min: 0,
    max: 100,
  });

  const prevCountRef = useRef(count);

  useEffect(() => {
    if (prevCountRef.current !== count) {
      dispatch(fetchPatchCartAsync(id, { ...cart, quantity: count }) as any);
    }
    prevCountRef.current = count;
  }, [count]);

  const navigateToProduct = () => {
    navigate(`/products/${id}`);
  };

  const onClickDeleteButton = async () => {
    dispatch(fetchDeleteCartAsync(id) as any);
  };

  return (
    <Styled.Container>
      <Styled.ImageWrapper onClick={navigateToProduct}>
        <Image src={imageURL} alt="" />
      </Styled.ImageWrapper>
      <Styled.NameWrapper onClick={navigateToProduct}>{name}</Styled.NameWrapper>
      <Styled.PriceWrapper>
        <Button backgroundColor={theme.whiteColor_1} onClick={onClickDeleteButton}>
          <Icon iconName="recycleBin" color={theme.greyColor_1} hoverColor={theme.redColor_1} />
        </Button>
        <Counter count={quantity} increaseCount={increaseCount} decreaseCount={decreaseCount} />
        <Styled.Text>{price}원</Styled.Text>
      </Styled.PriceWrapper>
    </Styled.Container>
  );
}

export default CartItem;
