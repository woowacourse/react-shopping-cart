import type { ProductItem } from "../../types/types";
import {
  CartCount,
  CartCountWrapper,
  ProductDetails,
  ProductInfo,
  ProductItemBox,
  ProductItemImage,
  ProductItemImageBox,
  ProductName,
  ProductPrice,
} from "./ProductItem.style";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { modalContentState, modalOpenState } from "../../recoil/modalAtoms.tsx";
import ProductModalContent from "../ProductModalContent/ProductModalContent.tsx";
import cartIcon from "../../assets/cart.svg";
import { quantityByProductIdSelector } from "../../recoil/cartAtoms.ts";

interface ProductItemProps {
  product: ProductItem;
}

function ProductItem({ product }: ProductItemProps) {
  const { name, price, imageUrl } = product;
  const setModalState = useSetRecoilState(modalOpenState);
  const setModalContentState = useSetRecoilState(modalContentState);
  const quantity = useRecoilValue(quantityByProductIdSelector(product.id));

  const openModal = () => {
    setModalState(true);
    setModalContentState(<ProductModalContent product={product} />);
  };

  return (
    <>
      <ProductItemBox onClick={openModal}>
        <ProductItemImageBox>
          <ProductItemImage src={imageUrl} />
        </ProductItemImageBox>
        <ProductDetails>
          <ProductInfo>
            <ProductName>{name}</ProductName>
            <ProductPrice>{price.toLocaleString()}원</ProductPrice>
          </ProductInfo>
          {quantity > 0 ? (
            <CartCountWrapper>
              <CartCount>{quantity}</CartCount>
            </CartCountWrapper>
          ) : (
            <img src={cartIcon}></img>
          )}
        </ProductDetails>
      </ProductItemBox>
    </>
  );
}

export default ProductItem;
