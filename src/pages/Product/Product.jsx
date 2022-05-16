import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProductDetail from 'components/ProductDetail';
import Skeleton from 'components/Skeleton';
import errorApiImg from 'assets/png/errorApiImg.png';
import ImgWrapper from 'components/ImgWrapper';
import { PATH } from 'constants/path';
import useProduct from 'hooks/useProduct';
import comma from 'utils/comma';

const Product = () => {
  const { getProductEffect, addCart, isLoading, product, isError } =
    useProduct();

  getProductEffect();

  const navigate = useNavigate();
  const handleClickCart = () => {
    addCart();
    navigate(PATH.CART);
  };

  return (
    <Styled.Wrapper>
      {isLoading && <Skeleton sizeType="large" />}
      {isError && <ImgWrapper src={errorApiImg} alt="API 에러 이미지" />}
      {!isLoading && product && (
        <ProductDetail
          imgUrl={product.imgUrl}
          name={product.name}
          price={comma(product.price)}
          id={product.id}
          onClickCart={handleClickCart}
        />
      )}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 50px;
  `,
};

export default Product;
