import PropTypes from 'prop-types';
import { Container, Image, DetailContainer, ProductDetail, Name, Price } from './ColumnProductItem.styles';
import productNotFoundImg from '../../../shared/assets/img/product_not_found.jpg';
import ShoppingCartIcon from '../../svg/ShoppingCartIcon/ShoppingCartIcon';

const whiteHeart = '\u2661';
const blackHeart = '\u2665';

const ColumnProductItem = ({
  imgSrc,
  name,
  price,
  onClickShoppingCartIcon,
  isVisibleIcon,
  onClickLikeButton,
  isLiked,
}) => (
  <Container>
    <Image src={imgSrc} loading="lazy" />
    <DetailContainer>
      <ProductDetail>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </ProductDetail>

      {isVisibleIcon && (
        <>
          <button type="button" onClick={onClickLikeButton}>
            {isLiked ? blackHeart : whiteHeart}
          </button>
          <button data-testid="shopping-cart-icon" type="button" onClick={onClickShoppingCartIcon}>
            <ShoppingCartIcon scale="0.6" />
          </button>
        </>
      )}
    </DetailContainer>
  </Container>
);

ColumnProductItem.propTypes = {
  imgSrc: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  onClickShoppingCartIcon: PropTypes.func.isRequired,
  isVisibleIcon: PropTypes.bool,
  isLiked: PropTypes.bool.isRequired,
  onClickLikeButton: PropTypes.func.isRequired,
};

ColumnProductItem.defaultProps = {
  imgSrc: productNotFoundImg,
  isVisibleIcon: true,
};

export default ColumnProductItem;
