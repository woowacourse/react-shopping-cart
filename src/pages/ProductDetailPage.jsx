import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getProductItem } from '../api';
import { BASE_COMPONENT, StyledImageWrapper, StyledImg } from '../components/common';
import PriceBox from '../components/common/PriceBox';
import useRequest from '../hooks/useRequest';

function ProductDetailPage() {
  const { id } = useParams();
  const { data: item, loading } = useRequest(() => getProductItem(id));

  if (loading) return null;

  const { imageUrl, name, price } = item;

  return (
    <StyledProductDetailContainer>
      <StyledImageWrapper width={'large'} height={'large'}>
        <StyledImg width={'large'} src={imageUrl}></StyledImg>
      </StyledImageWrapper>
      <StyledProductDetailInfo>
        <StyledProductDetailTitle>{name}</StyledProductDetailTitle>
        <hr />
        <StyledProductDetailPrice>
          <span>금액</span>
          <PriceBox price={price} fontSize={'20'} />
        </StyledProductDetailPrice>
      </StyledProductDetailInfo>
      <StyledShopButton>장바구니</StyledShopButton>
    </StyledProductDetailContainer>
  );
}

const StyledProductDetailContainer = styled(BASE_COMPONENT.flexCenterWrapper)`
  flex-direction: column;
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

const StyledProductDetailPrice = styled(BASE_COMPONENT.flexCenterWrapper)`
  justify-content: space-between;
  margin: 16px;
`;

const StyledShopButton = styled.button`
  width: 430px;
  height: 60px;
  left: 641px;
  bottom: 60px;
  background: ${({ theme }) => theme.COLORS.BROWN};
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: 24px;
  font-weight: 700;
  border-radius: 4px;
  border: none;
  &:hover {
    background-color: ${({ theme }) => theme.COLORS.LIGHT_BROWN};
  }
`;

export default ProductDetailPage;
