import { useSetRecoilState } from "recoil";
import { ProductItem } from "../types/types.ts";
import CartController from "./CartController";
import styled from "styled-components";
import { modalOpenState } from "../recoil/modalAtoms.tsx";

export const ProductItemImageBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0px 10px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 50%;
  }
`;

export const ProductItemImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
`;

export const ProductDetails = styled.div`
  width: 100%;
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 50%;
    padding: 0px 10px;
  }
`;

export const ProductModalContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
`;

export const ProductName = styled.div`
  font-size: 20px;
`;
export const ProductPrice = styled.div`
  font-size: 28px;
  font-weight: bold;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
`;

export const ModalTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
export const ModalCloseButton = styled.button`
  font-size: 20px;
`;

function ProductModalContent({ product }: { product: ProductItem }) {
  const { name, price, imageUrl } = product;
  const setModalOpen = useSetRecoilState(modalOpenState);
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <ModalHeader>
        <ModalTitle>상품 정보</ModalTitle>
        <ModalCloseButton onClick={closeModal}>X</ModalCloseButton>
      </ModalHeader>
      <ProductModalContentWrapper>
        <ProductItemImageBox>
          <ProductItemImage src={imageUrl} />
        </ProductItemImageBox>
        <ProductDetails>
          <div>
            <ProductName>{name}</ProductName>
            <ProductPrice>{price.toLocaleString()}원</ProductPrice>
          </div>
          <CartController product={product} />
        </ProductDetails>
      </ProductModalContentWrapper>
    </>
  );
}

export default ProductModalContent;
