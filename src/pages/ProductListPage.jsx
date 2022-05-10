import React from 'react';
import { useSelector } from 'react-redux';
import { GiShoppingCart } from 'react-icons/gi';
import styled from 'styled-components';

function ProductListPage(props) {
  const productList = useSelector((state) => state.productList);
  console.log(productList);

  return (
    <StyledContent>
      <StyledGridContainer>
        {productList.map((product) => {
          const { id, name, price, imageUrl } = product;
          console.log('product', product);
          return (
            <StyledItem key={id}>
              <StyledImageBox>
                <StyledImg src={imageUrl} />
              </StyledImageBox>
              <StyledItemInfoBox>
                <div>
                  <div>{name}</div>
                  <div>{price}</div>
                </div>
                <GiShoppingCart size={25} />
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
  height: 320px;
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
  margin: 16px 8px 0 8px;
`;

export default ProductListPage;
