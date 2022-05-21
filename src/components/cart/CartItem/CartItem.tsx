import Button from '@/components/common/Button/Button';
import Counter from '@/components/common/Counter/Counter';
import Icon from '@/components/common/Icon/Icon';
import Image from '@/components/common/Image/Image';
import Loading from '@/components/common/Loading/Loading';
import { useCount } from '@/hooks/useCount';
import useResponsive from '@/hooks/useResponsive';
import { fetchDeleteCartAsync, fetchPatchCartAsync } from '@/store/cart/action';
import theme from '@/styles/Theme';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Styled from './CartItem.style';
function CartItem({ cart }) {
  const { id, imageURL, name, price, quantity } = cart;

  const navigate = useNavigate();

  const isLoading = useSelector((state: any) => state.cart.loadingCartProductId) === id;
  const dispatch = useDispatch();

  const responsive = useResponsive();

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
        <Image
          src={imageURL}
          alt=""
          width={responsive === 'desktop' ? '200px' : '150px'}
          height={responsive === 'desktop' ? '200px' : '150px'}
        />
      </Styled.ImageWrapper>
      <Styled.NameWrapper onClick={navigateToProduct}>{name}</Styled.NameWrapper>
      <Styled.PriceWrapper>
        <Button backgroundColor={theme.whiteColor_1} onClick={onClickDeleteButton}>
          <Icon iconName="recycleBin" color={theme.greyColor_1} hoverColor={theme.redColor_1} />
        </Button>

        <Styled.CounterWrapper>
          {isLoading ? (
            <Loading>👻</Loading>
          ) : (
            <Counter count={quantity} increaseCount={increaseCount} decreaseCount={decreaseCount} />
          )}
        </Styled.CounterWrapper>

        <Styled.Text>{price}원</Styled.Text>
      </Styled.PriceWrapper>
    </Styled.Container>
  );
}

export default CartItem;
