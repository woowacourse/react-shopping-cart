import PropTypes from 'prop-types';
import { numberWithCommas } from '../../../shared/utils';
import { Container, ImageContainer, Image, ProductContainer, ProductDetail, Name } from './RowProductItem.styles';
import productNotFoundImg from '../../../shared/assets/img/product_not_found.jpeg';

const RowProductItem = ({ imgSrc, name, price, amount }) => {
  const onShowErrorImage = event => {
    event.target.src = productNotFoundImg;
  };

  return (
    <Container>
      <ImageContainer>
        <Image src={imgSrc} onError={onShowErrorImage} />
      </ImageContainer>
      <ProductContainer>
        <Name>{name}</Name>
        <ProductDetail>
          {price && <span>{`${numberWithCommas(price)} 원 / `}</span>}
          {amount && <span>{`수량: ${amount} 개`}</span>}
        </ProductDetail>
      </ProductContainer>
    </Container>
  );
};

RowProductItem.propTypes = {
  imgSrc: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
  amount: PropTypes.number,
};

RowProductItem.defaultProps = {
  imgSrc:
    'https://lh3.googleusercontent.com/proxy/1c4QW5NSZSE7GWkRDMJC-0fBKuXA0rOGWy3b7orSCWSui-lGrgG7yx03uivU67j0Rm2bWAdF46VvqAnW2mFJ3n-EQDu1fr7XzQey',
  price: null,
  amount: null,
};

export default RowProductItem;
