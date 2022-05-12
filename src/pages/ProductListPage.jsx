import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductListAsync } from '../store/actions';
import styled from 'styled-components';
import { COLORS } from '../styles/theme';
import { GiShoppingCart } from 'react-icons/gi';
import { StyledImageBox, StyledImg } from '../components/common';

function ProductListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productList = useSelector((state) => state.productList);

  const handleClickItem = async (id) => {
    navigate('/product-detail-page', { state: { id } });
  };

  const handleClickCart = () => {
    alert('기능 추가중...');
  };

  useEffect(() => {
    dispatch(getProductListAsync());
  }, [dispatch]);

  return (
    <StyledContent>
      <StyledGridContainer>
        {productList.map((product) => {
          const { id, name, price, imageUrl } = product;
          return (
            <StyledItem key={id}>
              <StyledImageBox
                width={'middle'}
                height={'middle'}
                onClick={() => handleClickItem(id)}
              >
                <StyledImg width={'middle'} src={imageUrl} />
              </StyledImageBox>
              <StyledItemInfoBox>
                <StyledItemInfo onClick={() => handleClickItem(id)}>
                  <StyledItemName>{name}</StyledItemName>
                  <StyledItemPrice>{Number(price).toLocaleString()} 원</StyledItemPrice>
                </StyledItemInfo>
                <StyledIconButton onClick={handleClickCart}>
                  <GiShoppingCart size={25} />
                </StyledIconButton>
              </StyledItemInfoBox>
            </StyledItem>
          );
        })}
      </StyledGridContainer>
    </StyledContent>
  );
}

const StyledContent = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 5vh;
`;

const StyledGridContainer = styled.div`
  display: grid;
  gap: 18px;
  width: 80%;
  grid-template-columns: repeat(4, 1fr);
  margin: auto;
  overflow-y: auto;
`;

const StyledItem = styled.div`
  width: 250px;
  height: 330px;
  cursor: pointer;
`;

const StyledItemInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 8px 0px 8px;
`;

const StyledItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledItemName = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.5px;
`;
const StyledItemPrice = styled.span`
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  letter-spacing: 0.5px;
`;

const StyledIconButton = styled.button`
  border: none;
  background: none;
  &:hover {
    transform: scale(1.1);
    color: ${COLORS.PRIMARY};
  }
`;
export default ProductListPage;
