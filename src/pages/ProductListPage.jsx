import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GiShoppingCart } from 'react-icons/gi';
import styled from 'styled-components';
import { COLORS } from '../styles/theme';
import { getProductListAsync } from '../store/actions';

function ProductListPage(props) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

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
              <StyledImageBox>
                <StyledImg src={imageUrl} />
              </StyledImageBox>
              <StyledItemInfoBox>
                <StyledItemInfo>
                  <StyledItemName>{name}</StyledItemName>
                  <StyledItemPrice>{Number(price).toLocaleString()} 원</StyledItemPrice>
                </StyledItemInfo>
                <StyledIconButton onClick={() => alert('기능 추가중...')}>
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
`;

const StyledImageBox = styled.div`
  width: 250px;
  height: 250px;
`;

const StyledImg = styled.img`
  width: 250px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
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
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    color: ${COLORS.PRIMARY};
  }
`;
export default ProductListPage;
