import PropTypes from 'prop-types';
import {
  Container,
  ImageContainer,
  Image,
  DetailContainer,
  ProductDetail,
  Name,
  Price,
} from './ColumnProductItem.styles';
import ShoppingCartIcon from '../../ShoppingCartIcon/ShoppingCartIcon';
import productNotFoundImg from '../../../shared/assets/img/product_not_found.jpeg';
import { numberWithCommas } from '../../../shared/utils';
import { IMAGE_SIZE } from '../../../constants';

const ColumnProductItem = ({
  imgSrc,
  name,
  price,
  onClickShoppingCartIcon,
  isVisibleIcon,
  onClickImage,
  imageSize,
}) => {
  const onShowErrorImage = event => {
    event.target.src = productNotFoundImg;
  };

  return (
    <Container imageSize={imageSize}>
      <ImageContainer imageSize={imageSize} onClick={onClickImage}>
        <Image imageSize={imageSize} src={imgSrc} onError={onShowErrorImage} loading="lazy" />
      </ImageContainer>
      <DetailContainer>
        <ProductDetail>
          <Name>{name}</Name>
          <Price>{`${numberWithCommas(price)} 원`}</Price>
        </ProductDetail>

        {isVisibleIcon && (
          <button data-testid="shopping-cart-icon" type="button" onClick={onClickShoppingCartIcon}>
            <ShoppingCartIcon scale="0.6" />
          </button>
        )}
      </DetailContainer>
    </Container>
  );
};

ColumnProductItem.propTypes = {
  imgSrc: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onClickShoppingCartIcon: PropTypes.func,
  onClickImage: PropTypes.func.isRequired,
  isVisibleIcon: PropTypes.bool,
  imageSize: PropTypes.string,
};

ColumnProductItem.defaultProps = {
  imgSrc: productNotFoundImg,
  isVisibleIcon: true,
  imageSize: IMAGE_SIZE.MD,
  onClickShoppingCartIcon: () => {},
};

export default ColumnProductItem;
