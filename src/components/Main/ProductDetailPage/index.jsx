import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import BoxButton from "../../common/BoxButton";

const DetailContainer = styled.section`
  width: 400px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-bottom: 1px solid #333;
  padding: 16px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 16px 20px;
`;

const ProductImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const ProductName = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textDefault};
  padding: 8px 0;
`;

const Span = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.textDefault};
  margin: auto 0;
`;

const ProductPrice = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.textDefault};
`;

function ProductDetailPage() {
  const { id: productId } = useParams();
  const productInfoList = useSelector((state) => state);

  const [selectedProduct] = productInfoList.filter(
    ({ id }) => id === Number(productId)
  );

  return (
    <DetailContainer>
      <Top>
        <ProductImage src={selectedProduct.thumbnailUrl} />
        <ProductName>{selectedProduct.name}</ProductName>
      </Top>
      <Bottom>
        <Span>금액</Span>
        <ProductPrice>{selectedProduct.price.toLocaleString()}원</ProductPrice>
      </Bottom>
      <BoxButton
        onClick={() => {
          alert("🛒아직입니다~~^^🛒");
        }}
        bgColor="#73675C"
      >
        장바구니 담기
      </BoxButton>
    </DetailContainer>
  );
}

export default ProductDetailPage;
