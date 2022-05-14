import Styled from './style';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';

const ProductDetail = ({ imgUrl, name, price, onClick }) => {
  return (
    <>
      <Styled.ProductImg src={imgUrl} alt="상품 이미지" />
      <Styled.ProductInfo>
        <Styled.ProductName>{name}</Styled.ProductName>
        <Styled.Line />
        <Styled.ProductPrice>
          <p>금액</p>
          <p>{price}원</p>
        </Styled.ProductPrice>
        <Button colorType="secondary" sizeType="large" onClick={onClick}>
          장바구니
        </Button>
      </Styled.ProductInfo>
    </>
  );
};

ProductDetail.propTypes = {
  id: PropTypes.number,
  imgUrl: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  onClick: PropTypes.func,
};

export default ProductDetail;
