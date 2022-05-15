import { useCallback, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CONDITION from 'constants/condition';
import { StoreState } from 'types';
import { getProduct } from 'redux/thunks';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const condition = useSelector((state: StoreState) => state.condition);
  const productDetail = useSelector((state: StoreState) => state.productDetail);

  useLayoutEffect(() => {
    if (id) {
      getProduct(dispatch, id);
    }
  }, [dispatch, id]);

  const renderSwitch = useCallback(() => {
    switch (condition) {
      case CONDITION.LOADING:
        return <Message>Loading...</Message>;
      case CONDITION.COMPLETE:
        return productDetail ? (
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
        ) : null;
      case CONDITION.ERROR:
        return (
          <Message>상품 정보를 가져오는데 오류가 발생하였습니다 😱</Message>
        );
    }
  }, [condition, productDetail]);

  return <StyledPage>{renderSwitch()}</StyledPage>;
}

const StyledPage = styled.div`
  width: 570px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px auto;
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

const Message = styled.div`
  font-size: 25px;
`;

export default ProductPage;
