import PropTypes from 'prop-types';
import { Container, Image, DetailContainer, ProductDetail, Name, Price } from './ColumnProductItem.styles';
import ShoppingCartIcon from '../../ShoppingCartIcon/ShoppingCartIcon';
import productNotFoundImg from '../../../shared/assets/img/product_not_found.jpg';
import { numberWithCommas } from '../../../shared/utils';

const ColumnProductItem = ({ imgSrc, name, price, onClickShoppingCartIcon, isVisibleIcon }) => (
  <Container>
    <Image src={imgSrc} loading="lazy" />
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

ColumnProductItem.propTypes = {
  imgSrc: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  onClickShoppingCartIcon: PropTypes.func,
  isVisibleIcon: PropTypes.bool,
};

ColumnProductItem.defaultProps = {
  imgSrc: productNotFoundImg,
  onClickShoppingCartIcon: () => {},
  isVisibleIcon: true,
};

export default ColumnProductItem;
