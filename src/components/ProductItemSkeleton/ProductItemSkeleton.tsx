import {
  ProductDetails,
  ProductInfo,
  ProductItemBox,
  ProductItemImage,
  ProductItemImageBox,
  ProductName,
  ProductPrice,
} from "./ProductItemSkeleton.style.ts";

function ProductItemSkeleton() {
  return (
    <ProductItemBox>
      <ProductItemImageBox>
        <ProductItemImage />
      </ProductItemImageBox>
      <ProductDetails>
        <ProductInfo>
          <ProductName />
          <ProductPrice />
        </ProductInfo>
      </ProductDetails>
    </ProductItemBox>
  );
}

export default ProductItemSkeleton;
