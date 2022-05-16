import Styled from './style';
import { useNavigate } from 'react-router-dom';
import { PATH_NAME } from 'constants';
import PropTypes from 'prop-types';
import smallCart from 'assets/svg/smallCart.svg';
import parsePrice from 'utils/parsePrice';

const ProductItem = ({ id, name, price, imgUrl, onClickCartButton }) => {
  const navigate = useNavigate();

  const handleClickItem = () => {
    navigate(`${PATH_NAME.PRODUCT}/${id}`);
  };

  return (
    <Styled.Wrapper onClick={handleClickItem}>
      <Styled.Overlay>
        <Styled.ProductNamePreview>{name}</Styled.ProductNamePreview>
      </Styled.Overlay>
      <Styled.ProductImage src={imgUrl} loading="lazy" />
      <Styled.ProductDetail>
        <Styled.ProductInfo>
          <Styled.ProductName>{name}</Styled.ProductName>
          <Styled.ProductPrice>{parsePrice(price)}원</Styled.ProductPrice>
        </Styled.ProductInfo>
        <Styled.CartButton onClick={onClickCartButton}>
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
  onClickCartButton: PropTypes.func,
};

export default ProductItem;
