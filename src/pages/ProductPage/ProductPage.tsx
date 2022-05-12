import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { actions } from '../../actions/actions';
import Spinner from '../../components/Spinner/Spinner';
import { StoreState } from '../../types';

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetail, isLoading } = useSelector((state: StoreState) => ({
    isLoading: state.isLoading,
    productDetail: state.productDetail,
  }));

  useLayoutEffect(() => {
    if (id) {
      dispatch(actions.getProductDetail(id));
    }
  }, [id, dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <StyledPage>
      {productDetail ? (
        <>
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
        </>
      ) : (
        <StyledImageContainer>
          <EmptyProductImage>존재하지 않는 상품입니다.</EmptyProductImage>
        </StyledImageContainer>
      )}
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
