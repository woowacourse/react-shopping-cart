import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from '../../components/Spinner/Spinner';
import useProductPage from './useProductDetail';

function ProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, productDetail, error } = useProductPage(id);

  useEffect(() => {
    if (error) {
      alert(error);
      navigate('/');
    }
  }, [error, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  if (productDetail) {
    return (
      <StyledPage>
        <StyledImageContainer>
          <img src={productDetail.image} alt={productDetail.name} />
        </StyledImageContainer>
        <h2>{productDetail.name}</h2>
        <hr />
        <dl>
          <dt>가격</dt>
          <dd>{Number(productDetail.price)?.toLocaleString('ko-KR')} 원</dd>
        </dl>
        <dl>
          <dt>제품 설명</dt>
          <dd>{productDetail.description}</dd>
        </dl>
        <StyledAddToCartButton>장바구니</StyledAddToCartButton>
      </StyledPage>
    );
  }

  return (
    <StyledPage>
      <StyledImageContainer>
        <EmptyProductImage>존재하지 않는 상품입니다.</EmptyProductImage>
      </StyledImageContainer>
    </StyledPage>
  );
}

const StyledPage = styled.div`
  width: 570px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  h2 {
    font-size: 2rem;
    font-weight: 500;
    line-height: 2.7rem;
  }

  hr {
    width: 100%;
  }

  dl {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
  }
`;

const StyledImageContainer = styled.div`
  aspect-ratio: 1 / 1;
  overflow: hidden;
  width: 100%;

  img {
    width: 100%;
  }
`;

const StyledAddToCartButton = styled.button`
  background: ${({ theme: { colors } }) => colors.black};
  color: ${({ theme: { colors } }) => colors.white};
  width: 200px;
  height: 60px;
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: 600;
`;

const EmptyProductImage = styled.div`
  background: ${({ theme: { colors } }) => colors.gray};
  color: ${({ theme: { colors } }) => colors.white};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
`;

export default ProductPage;
