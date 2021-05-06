import PropTypes from 'prop-types';
import { Container, Image, DetailContainer, ProductDetail, Name, Price } from './ColumnProductItem.styles';
import ShoppingCartIcon from '../../ShoppingCartIcon/ShoppingCartIcon';
import productNotFoundImg from '../../../shared/assets/img/product_not_found.jpg';

const ColumnProductItem = ({ imgSrc, name, price, onClick }) => (
  <Container>
    <Image src={imgSrc} />
    <DetailContainer>
      <ProductDetail>
        <Name>{name}</Name>
        <Price>{`${price} 원`}</Price>
      </ProductDetail>

      <button type="button" onClick={onClick}>
        <ShoppingCartIcon scale="0.6" />
      </button>
    </DetailContainer>
  </Container>
);

ColumnProductItem.propTypes = {
  imgSrc: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

ColumnProductItem.defaultProps = {
  imgSrc: productNotFoundImg,
  onClick: () => {},
};

export default ColumnProductItem;
