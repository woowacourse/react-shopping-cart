import type {ProductItem} from '../../types/types';
import CartController from '../CartController';
import {
  ProductDetails, ProductInfo, ProductItemBox,
  ProductItemImage, ProductItemImageBox, ProductName, ProductPrice
} from './ProductItem.style';

interface ProductItemProps {
  product: ProductItem;
}

function ProductItem({product}: ProductItemProps) {
  const {name, price, imageUrl} = product;

  return (
    <ProductItemBox>
      <ProductItemImageBox>
        <ProductItemImage src={imageUrl}/>
      </ProductItemImageBox>
      <ProductDetails>
        <ProductInfo>
          <ProductName>{name}</ProductName>
          <ProductPrice>{price.toLocaleString()}원</ProductPrice>
        </ProductInfo>
        <CartController product={product}/>
      </ProductDetails>
    </ProductItemBox>
  );
}

export default ProductItem;
