import PropTypes from 'prop-types';
import { Container, Image, DetailContainer, ProductDetail, Name, Price } from './ColumnProductItem.styles';
import ShoppingCartIcon from '../../ShoppingCartIcon/ShoppingCartIcon';

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
  imgSrc:
    'https://lh3.googleusercontent.com/proxy/1c4QW5NSZSE7GWkRDMJC-0fBKuXA0rOGWy3b7orSCWSui-lGrgG7yx03uivU67j0Rm2bWAdF46VvqAnW2mFJ3n-EQDu1fr7XzQey',
  onClick: () => {},
};

export default ColumnProductItem;
