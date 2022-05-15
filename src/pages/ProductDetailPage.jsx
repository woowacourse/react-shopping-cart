import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getProductItem } from '../api';
import { StyledImageBox, StyledImg } from '../components/common';
import useRequest from '../hooks/useRequest';
import { COLORS } from '../styles/theme';

function ProductDetailPage() {
  const { id } = useParams();
  const { data: item, loading } = useRequest(() => getProductItem(id));

  if (loading) return null;

  const { imageUrl, name, price } = item;

  return (
    <StyledProductDetailContainer>
      <StyledImageBox width={'large'} height={'large'}>
        <StyledImg width={'large'} src={imageUrl}></StyledImg>
      </StyledImageBox>
      <StyledProductDetailInfo>
        <StyledProductDetailTitle>{name}</StyledProductDetailTitle>
        <hr />
        <StyledProductDetailPrice>
          <span>금액</span>
          <StyledPriceBox>{Number(price).toLocaleString()}원</StyledPriceBox>
        </StyledProductDetailPrice>
      </StyledProductDetailInfo>
      <StyledShopButton>장바구니</StyledShopButton>
    </StyledProductDetailContainer>
  );
}

const StyledProductDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 60px auto;
`;

const StyledProductDetailInfo = styled.div`
  width: 450px;
`;

const StyledProductDetailTitle = styled.div`
  margin: 16px;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: 0.5px;
`;

const StyledProductDetailPrice = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 16px;
`;

const StyledPriceBox = styled.span`
  font-size: 20px;
  font-weight: 400;
`;

const StyledShopButton = styled.button`
  width: 430px;
  height: 60px;
  left: 641px;
  bottom: 60px;
  background: ${COLORS.BROWN};
  color: ${COLORS.WHITE};
  font-size: 24px;
  font-weight: 700;
  border-radius: 4px;
  border: none;
  &:hover {
    background-color: ${COLORS.LIGHT_BROWN};
  }
`;

export default ProductDetailPage;
