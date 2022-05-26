import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { StyledImageBox, StyledImg } from '../components/common/Styled';
import { MESSAGE, SERVER_PATH } from '../constant';
import { COLORS } from '../styles/theme';
import Loading from '../components/Loading';
import { SIZE } from '../constant';
import useFetch from '../hooks/useFetch';
import useCart from '../hooks/useCart';

function ProductDetailPage() {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useFetch(`${SERVER_PATH.PRODUCTS}/${id}`);
  const { addItem } = useCart();

  const onClickCartButton = () => {
    alert(MESSAGE.ADD);
    addItem(id);
  };

  if (isError) return <h1>error</h1>;
  if (isLoading) return <Loading />;

  const { imageUrl, name, price } = product;

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
