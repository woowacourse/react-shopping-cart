import styled from 'styled-components';
import useProduct from 'hooks/useProduct';
import ProductDetail from 'components/ProductDetail';
import Skeleton from 'components/Skeleton';
import ImgWrapper from 'components/ImgWrapper';
import comma from 'utils/comma';
import errorApiImg from 'assets/png/errorApiImg.png';

const Product = () => {
  const { getProductEffect, isLoading, product, isError } = useProduct();

  getProductEffect();

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
