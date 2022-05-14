import Styled from './style';
import { useNavigate } from 'react-router-dom';
import { PATH_NAME } from 'constants';
import PropTypes from 'prop-types';
import smallCart from 'assets/svg/smallCart.svg';

const ProductItem = ({ id, name, price, imgUrl }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${PATH_NAME.PRODUCT}/${id}`);
  };

  return (
    <Styled.Wrapper onClick={handleClick}>
      <Styled.Overlay>
        <Styled.ProductNamePreview>{name}</Styled.ProductNamePreview>
      </Styled.Overlay>
      <Styled.ProductImage src={imgUrl} />
      <Styled.ProductDetail>
        <Styled.ProductInfo>
          <Styled.ProductName>{name}</Styled.ProductName>
          <Styled.ProductPrice>{price}원</Styled.ProductPrice>
        </Styled.ProductInfo>
        <Styled.CartButton>
          <Styled.CartSvg src={smallCart} />
        </Styled.CartButton>
      </Styled.ProductDetail>
    </Styled.Wrapper>
  );
};

ProductItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.string,
  imgUrl: PropTypes.string,
};

export default ProductItem;
