import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropType from 'prop-types';

import { addProductToCarts, deleteProductFromCarts } from 'store/carts';

import { CART_SIZE, COLOR } from 'constants/styles';
import PATH from 'constants/path';

import { BasicImage, BasicButton, Flex } from 'components/shared/basics';
import { ReactComponent as CartIcon } from 'components/shared/CartIcon.svg';

import useStoreProduct from 'hooks/useStoreProduct';
import useDeleteProductFromCart from 'hooks/useDeleteProductFromCart';
import usePropInitState from 'hooks/usePropInitState';
import useUser from 'hooks/useUser';
import useDebounce from 'hooks/useDebounce';

function ProductItem({ id, src, price, title, isStored }) {
  const dispatch = useDispatch();
  const debounce = useDebounce();

  const { isLoggedIn } = useUser();
  const { addToCart } = useStoreProduct(id);
  const { deleteFromCart } = useDeleteProductFromCart(id);
  const [isClicked, setIsClicked] = usePropInitState(isStored);

  const handleCartClick = () => {
    if (!isLoggedIn) {
      window.alert('로그인 해주세요.');
      return;
    }

    debounce(() => {
      if (isClicked) {
        deleteFromCart();
        dispatch(deleteProductFromCarts(id));
      } else {
        addToCart();
        dispatch(addProductToCarts(id));
      }

      setIsClicked((prev) => !prev);
    }, 500);
  };

  return (
    <div>
      <Link to={`${PATH.PRODUCT}/${id}`}>
        <Styled.ProductImageWrapper>
          <Styled.ProductImage src={src} alt={title} />
        </Styled.ProductImageWrapper>
      </Link>
      <Styled.ProductInfoFlexContainer justify="space-between" align="center">
        <Flex direction="column">
          <Styled.ProductName>{title}</Styled.ProductName>
          <Styled.ProductPrice>{`${price}원`}</Styled.ProductPrice>
        </Flex>
        <Styled.CartButton onClick={handleCartClick}>
          <CartIcon
            width={CART_SIZE.SMALL.WIDTH}
            height={CART_SIZE.SMALL.HEIGHT}
            fill={isClicked ? COLOR.PRIMARY : COLOR.BLACK}
          />
        </Styled.CartButton>
      </Styled.ProductInfoFlexContainer>
    </div>
  );
}

ProductItem.propTypes = {
  id: PropType.string.isRequired,
  src: PropType.string.isRequired,
  title: PropType.string.isRequired,
  price: PropType.string.isRequired,
  isStored: PropType.bool,
};

ProductItem.defaultState = {
  isStored: false,
};

export default ProductItem;

const Styled = {
  ProductInfoFlexContainer: styled(Flex)`
    width: 280px;
    padding: 5px;
  `,
  ProductImageWrapper: styled(Flex)`
    width: 100%;
    overflow: hidden;
  `,
  ProductImage: styled(BasicImage)`
    cursor: pointer;
    transition: all ease-in-out 0.1s;
    &:hover {
      transform: scale(1.05);
    }
  `,
  ProductName: styled.span`
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
  `,
  ProductPrice: styled.span`
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
  `,
  CartButton: styled(BasicButton)`
    &:hover {
      opacity: 0.6;
    }
    &:active {
      transform: scale(0.9);
    }
  `,
};
