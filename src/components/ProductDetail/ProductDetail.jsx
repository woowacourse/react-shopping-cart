import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';

const ProductDetail = ({ imgUrl, name, price, id }) => {
  return (
    <Styled.Wrapper>
      <Styled.ProductImg src={imgUrl} alt="상품 이미지" />
      <Styled.ProductInfo>
        <Styled.ProductName>{name}</Styled.ProductName>
        <Styled.Line />
        <Styled.ProductPrice>
          <p>금액</p>
          <p>{price}원</p>
        </Styled.ProductPrice>
        <Button colorType="secondary" sizeType="large">
          장바구니 {id}
        </Button>
      </Styled.ProductInfo>
    </Styled.Wrapper>
  );
};

ProductDetail.propTypes = {
  id: PropTypes.string,
  imgUrl: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
};

const Styled = {
  Wrapper: styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
  ProductImg: styled.img`
    width: 350px;
    height: 350px;
  `,
  ProductInfo: styled.div`
    width: 380px;
  `,
  ProductName: styled.div`
    margin: 10px 0 10px 15px;
    font-size: 18px;
    font-weight: 700;
  `,
  ProductPrice: styled.div`
    margin: 0 0 10px 15px;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 400;
  `,

  Line: styled.hr`
    margin: 0;
  `,
};

export default ProductDetail;
