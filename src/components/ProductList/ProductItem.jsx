import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropType from 'prop-types';

import { BasicImage, BasicButton } from '../shared/basics';
import { CART_SIZE, COLOR } from '../../constants/styles';
import { ReactComponent as CartIcon } from '../shared/CartIcon.svg';
import PATH from '../../constants/path';
import useStoreProduct from '../../hooks/useStoreProduct';
import useDeleteProductFromCart from '../../hooks/useDeleteProductFromCart';
import { addProductToCarts, deleteProductFromCarts } from '../../store/carts';
import usePropDefaultState from '../../hooks/usePropDefaultState';
import useUser from '../../hooks/useUser';

function ProductItem({ id, src, price, title, isStored }) {
  const dispatch = useDispatch();
  const timeout = useRef();

  const { isLoggedIn } = useUser();
  const { addToCart } = useStoreProduct(id);
  const { deleteFromCart } = useDeleteProductFromCart(id);
  const [isClicked, setIsClicked] = usePropDefaultState(isStored);

  const handleCartClick = async () => {
    if (!isLoggedIn) {
      window.alert('로그인 해주세요.');
      return;
    }

    clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      if (isClicked) {
        deleteFromCart();
        dispatch(deleteProductFromCarts(id));
      } else {
        addToCart();
        dispatch(addProductToCarts(id));
      }
    }, 500);

    setIsClicked((prev) => !prev);
  };

  return (
    <div>
      <Link to={`${PATH.PRODUCT}/${id}`}>
        <Styled.ProductImageWrapper>
          <Styled.ProductImage src={src} alt={title} />
        </Styled.ProductImageWrapper>
      </Link>
      <Styled.ProductInfoContainer>
        <Styled.ProductInfoWrapper>
          <Styled.ProductName>{title}</Styled.ProductName>
          <Styled.ProductPrice>{`${price}원`}</Styled.ProductPrice>
        </Styled.ProductInfoWrapper>
        <Styled.CartButton onClick={handleCartClick}>
          <CartIcon
            width={CART_SIZE.SMALL.WIDTH}
            height={CART_SIZE.SMALL.HEIGHT}
            fill={isClicked ? COLOR.PRIMARY : COLOR.BLACK}
          />
        </Styled.CartButton>
      </Styled.ProductInfoContainer>
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
  ProductInfoContainer: styled.div`
    display: flex;
    justify-content: space-between;
    width: 280px;
    padding: 5px;
    align-items: center;
  `,
  ProductInfoWrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
  ProductImageWrapper: styled.div`
    display: flex;
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
  `,
};
