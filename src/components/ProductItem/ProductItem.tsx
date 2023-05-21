import type {ProductItem} from '../../types/types';
import CartController from '../CartController';
import {
  ProductDetails, ProductInfo, ProductItemBox,
  ProductItemImage, ProductItemImageBox, ProductName, ProductPrice
} from './ProductItem.style';
import {useSetRecoilState} from "recoil";
import {modalOpenState} from "../../recoil/modalAtoms.tsx";

interface ProductItemProps {
  product: ProductItem;
}

function ProductItem({product}: ProductItemProps) {
  const {name, price, imageUrl} = product;
  const setModalState = useSetRecoilState(modalOpenState);
  const openModal = () => {
    setModalState(true);
  };

  return (
    <>
      <ProductItemBox onClick={openModal}>
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
    </>


  );
}

export default ProductItem;
