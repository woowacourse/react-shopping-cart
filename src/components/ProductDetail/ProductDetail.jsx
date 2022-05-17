import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import useAddCart from 'hooks/useAddCart';
import { useNavigate } from 'react-router-dom';
import { PATH } from 'constants/path';

const ProductDetail = ({ imgUrl, name, price }) => {
  const navigate = useNavigate();
  const { addCartItem } = useAddCart();

  const handleClickCart = () => {
    addCartItem();
    navigate(PATH.CART);
  };

  return (
    <>
      <Styled.ProductImage src={imgUrl} alt={name} />
      <Styled.ProductInfo>
        <Styled.ProductName>{name}</Styled.ProductName>
        <Styled.Line />
        <Styled.ProductPrice>
          <p>금액</p>
          <p>{price}원</p>
        </Styled.ProductPrice>
        <Button
          colorType="secondary"
          sizeType="large"
          onClick={handleClickCart}
        >
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
  onClickCart: PropTypes.func,
};

const Styled = {
  ProductImage: styled.img`
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
