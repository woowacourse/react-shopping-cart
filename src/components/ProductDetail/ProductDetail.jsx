import Styled from './style';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import parsePrice from 'utils/parsePrice';

const ProductDetail = ({ imgUrl, name, price, onClickCartButton }) => {
  return (
    <>
      <Styled.ProductImg src={imgUrl} alt="상품 이미지" />
      <Styled.ProductInfo>
        <Styled.ProductName>{name}</Styled.ProductName>
        <Styled.Line />
        <Styled.ProductPrice>
          <p>금액</p>
          <p>{parsePrice(price)}원</p>
        </Styled.ProductPrice>
        <Button
          colorType="secondary"
          sizeType="large"
          onClick={onClickCartButton}
        >
          장바구니
        </Button>
      </Styled.ProductInfo>
    </>
  );
};

ProductDetail.propTypes = {
  imgUrl: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  onClickCartButton: PropTypes.func,
};

export default ProductDetail;
