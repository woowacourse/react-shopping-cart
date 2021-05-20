import PropTypes from 'prop-types';
import { Container, Image, ProductContainer, ProductDetail, Name } from './RowProductItem.styles';

const RowProductItem = ({ imgSrc, name, price, amount }) => (
  <Container>
    <Image src={imgSrc} />
    <ProductContainer>
      <Name>{name}</Name>
      <ProductDetail>
        {price && <span>{price}</span>}
        {amount && <span>{amount}</span>}
      </ProductDetail>
    </ProductContainer>
  </Container>
);

RowProductItem.propTypes = {
  imgSrc: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.string,
  amount: PropTypes.string,
};

RowProductItem.defaultProps = {
  imgSrc:
    'https://lh3.googleusercontent.com/proxy/1c4QW5NSZSE7GWkRDMJC-0fBKuXA0rOGWy3b7orSCWSui-lGrgG7yx03uivU67j0Rm2bWAdF46VvqAnW2mFJ3n-EQDu1fr7XzQey',
  price: '',
  amount: '',
};

export default RowProductItem;
