import PropTypes from 'prop-types';
import { Container, Image, BottomContainer, ProductDetail, Name, Price } from './ProductItem.styles';
import ShoppingCartIcon from '../ShoppingCartIcon/ShoppingCartIcon';

const ProductItem = ({ imgSrc, name, price, onClick }) => (
  <Container>
    <Image src={imgSrc} />
    <BottomContainer>
      <ProductDetail>
        <Name>{name}</Name>
        <Price>{`${price} 원`}</Price>
      </ProductDetail>
      <button type="button" onClick={onClick}>
        <ShoppingCartIcon scale="0.6" />
      </button>
    </BottomContainer>
  </Container>
);

ProductItem.propTypes = {
  imgSrc: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

ProductItem.defaultProps = {
  imgSrc:
    'https://lh3.googleusercontent.com/proxy/1c4QW5NSZSE7GWkRDMJC-0fBKuXA0rOGWy3b7orSCWSui-lGrgG7yx03uivU67j0Rm2bWAdF46VvqAnW2mFJ3n-EQDu1fr7XzQey',
  onClick: () => {},
};

export default ProductItem;
