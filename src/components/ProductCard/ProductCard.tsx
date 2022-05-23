import PlainLink from '../PlainLink/PlainLink';
import styled from 'styled-components';
import { Product } from '../../types';
import ICONS from '../../constants/icons';

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  const { id, name, price, stock, description, image } = {
    ...product,
  };

  return (
    <PlainLink to={`/product/${id}`} disabled={stock <= 0}>
      <StyledProductCard>
        <CardImageContainer>
          {stock > 0 ? (
            <CardImageOverlay>
              <p>{description}</p>
              <div>구매하기</div>
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
          <button>{ICONS.SHOPPING_CART}</button>
        </CardButtonContainer>
      </StyledProductCard>
    </PlainLink>
  );
}

const OutOfStockOverlay = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: ${({ theme: { zPriorities } }) => zPriorities.front};
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme: { colors } }) => colors.white};
  font-size: 2rem;
  font-weight: 700;
`;

const CardImageOverlay = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: ${({ theme: { zPriorities } }) => zPriorities.front};

  background: rgba(0, 0, 0, 0.3);

  p {
    inset: 30px 30px 60px;
    color: white;
    position: absolute;

    line-height: 1.4rem;

    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
  }

  div {
    position: absolute;
    bottom: 0px;
    right: 0px;
    font-size: 24px;
    color: white;
    padding: 10px;
    background: ${({ theme: { colors } }) => colors.black};
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
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 16px;
  }

  p {
    font-size: 20px;
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
  width: 282px;
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
