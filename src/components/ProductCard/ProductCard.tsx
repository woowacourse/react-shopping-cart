import CART_MESSAGE from 'constants/message';
import Link from 'components/@shared/Link';
import PATH from 'constants/path';
import { Product } from 'types/index';
import ShoppingCart from 'components/@shared/ShoppingCart';
import { cartActions } from 'redux/actions';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

type Props = {
  product: Product;
  isInCart: boolean;
};

function ProductCard({ product, isInCart }: Props) {
  const { id, name, price, stock, description, image } = {
    ...product,
    stock: Number(product.stock),
    price: Number(product.price),
  };
  const dispatch = useDispatch();

  const onClickCartButton = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(cartActions.addToCart(id));
    alert(CART_MESSAGE.SUCCESS_ADD);
  };

  return (
    <Link to={`${PATH.PRODUCT}/${id}`} disabled={stock <= 0}>
      <StyledProductCard>
        <CardImageContainer>
          {stock > 0 ? (
            <CardImageOverlay>
              <p>{description}</p>
              <div onClick={onClickCartButton}>구매하기</div>
            </CardImageOverlay>
          ) : (
            <OutOfStockOverlay>품절</OutOfStockOverlay>
          )}
          <img src={image} alt={name} />
        </CardImageContainer>
        <CardDescriptionContainer>
          <h3>{name}</h3>
          <p>{price.toLocaleString('ko-KR')} 원</p>
        </CardDescriptionContainer>
        <CardButtonContainer>
          <button onClick={onClickCartButton}>
            <ShoppingCart
              width="100%"
              fill={isInCart ? '#ff9c9c' : 'currentColor'}
            />
          </button>
        </CardButtonContainer>
      </StyledProductCard>
    </Link>
  );
}

const OutOfStockOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  box-sizing: border-box;

  width: 100%;
  height: 100%;
  z-index: ${({ theme: { zPriorities } }) => zPriorities.front};

  background: rgba(0, 0, 0, 0.3);
  color: ${({ theme: { colors } }) => colors.white};

  font-size: 25px;
  font-weight: 700;
`;

const CardImageOverlay = styled.div`
  position: absolute;
  box-sizing: border-box;

  width: 100%;
  height: 100%;
  z-index: ${({ theme: { zPriorities } }) => zPriorities.front};

  background: rgba(0, 0, 0, 0.3);

  p {
    inset: 30px 30px 60px;
    position: absolute;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;

    line-height: 1.4rem;

    color: white;

    font-size: 13px;
    font-weight: 700;
  }

  div {
    position: absolute;

    bottom: 0px;
    right: 0px;
    padding: 10px;

    background: ${({ theme: { colors } }) => colors.black};
    color: ${({ theme: { colors } }) => colors.white};

    font-size: 16px;
  }
`;

const CardImageContainer = styled.div`
  grid-column: 1 / 5;
  grid-row: 1 / 5;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  position: relative;

  img {
    width: 100%;
  }
`;

const CardDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  grid-column: 1 / 4;
  grid-row: 5;
  font-weight: 400;

  h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 13px;
  }

  p {
    font-size: 16px;
  }
`;

const CardButtonContainer = styled.div`
  grid-column: 4;
  grid-row: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  color: inherit;

  button {
    color: inherit;
    background: none;
    width: 30px;
    height: 27px;
  }
`;

const StyledProductCard = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: repeat(5, 1fr);
  grid-gap: 10px;
  width: 200px;
  color: ${({ theme: { colors } }) => colors.black};

  :not(:hover) {
    ${CardImageContainer} {
      ${CardImageOverlay} {
        opacity: 0;
        transition-duration: 0.3s;
      }

      img {
        transform: scale(1, 1);
        transition-duration: 0.3s;
      }
    }
  }

  :hover {
    ${CardImageContainer} {
      ${CardImageOverlay} {
        opacity: 1;
        transition-duration: 0.3s;
      }

      img {
        transform: scale(1.05, 1.05);
        transition-duration: 0.3s;
      }
    }

    ${CardDescriptionContainer} > h3 {
      text-decoration: underline;
    }
  }
`;

export default ProductCard;
