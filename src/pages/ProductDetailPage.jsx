import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { StyledImageBox, StyledImg } from '../components/common/Styled';
import { SERVER_PATH } from '../constant';
import { COLORS } from '../styles/theme';
import Loading from '../components/Loading';
import { SIZE } from '../constant';
import useAddCartItem from '../hooks/useAddCartItem';

function ProductDetailPage() {
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(true);
  const { addCartItem } = useAddCartItem();
  const { id } = useParams();

  const onClickCartButton = () => {
    addCartItem(id);
  };

  useEffect(() => {
    async function getProductItemInfo(id) {
      try {
        const { data } = await axios.get(`${SERVER_PATH.PRODUCTS}/${id}`);
        setItem(data);
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    }
    getProductItemInfo(id);
  }, [id]);

  if (loading) return <Loading />;

  const { imageUrl, name, price } = item;

  return (
    <StyledProductDetailContainer>
      <StyledImageBox width={SIZE.LARGE} height={SIZE.LARGE}>
        <StyledImg width={SIZE.LARGE} src={imageUrl} alt={name}></StyledImg>
      </StyledImageBox>
      <StyledProductDetailInfo>
        <StyledProductDetailTitle>{name}</StyledProductDetailTitle>
        <hr />
        <StyledProductDetailPrice>
          <span>금액</span>
          <StyledPriceBox>{Number(price).toLocaleString()}원</StyledPriceBox>
        </StyledProductDetailPrice>
      </StyledProductDetailInfo>
      <StyledCartButton onClick={onClickCartButton}>장바구니</StyledCartButton>
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

const StyledCartButton = styled.button`
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
