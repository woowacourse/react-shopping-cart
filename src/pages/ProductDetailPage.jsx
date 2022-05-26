import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getProductItem } from '../api';
import { BASE_COMPONENT, StyledImageWrapper, StyledImg } from '../components/common';
import Loading from '../components/common/Loading';
import PriceBox from '../components/common/PriceBox';
import useRequest from '../hooks/useRequest';
import { AddProductToCartAsync } from '../store/modules/cart/actions';

function ProductDetailPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.cart);
  const { id } = useParams();
  const { data: item, loading } = useRequest(() => getProductItem(id));

  const isCkecked = useMemo(() => !!products.find((product) => product.id === id), [id, products]);

  const handleClick = (isCkecked, product) => {
    if (isCkecked) {
      alert('이미 장바구니에 들어 있습니다.');
      navigate('/cart');
      return;
    }

    alert('장바구니에 추가 되었습니다.');
    dispatch(AddProductToCartAsync(product));
    navigate('/cart');
  };

  if (loading) return <Loading />;

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
      <StyledShopButton onClick={() => handleClick(isCkecked, item)}>장바구니</StyledShopButton>
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
