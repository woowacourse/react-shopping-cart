import type {ProductItem} from '../../types/types';
import {
  ProductDetails, ProductInfo, ProductItemBox,
  ProductItemImage, ProductItemImageBox, ProductName, ProductPrice
} from './ProductItem.style';
import {useSetRecoilState} from "recoil";
import {modalContentState, modalOpenState} from "../../recoil/modalAtoms.tsx";
import ProductModalContent from "../ProductModalContent.tsx";
import cartIcon from "../../assets/cart.svg";

interface ProductItemProps {
  product: ProductItem;
}

function ProductItem({product}: ProductItemProps) {
  const {name, price, imageUrl} = product;
  const setModalState = useSetRecoilState(modalOpenState);
  const setModalContentState = useSetRecoilState(modalContentState);

  const openModal = () => {
    setModalState(true);
    setModalContentState(<ProductModalContent product={product}/>);
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
          <img src={cartIcon}></img>
        </ProductDetails>
      </ProductItemBox>
    </>


  );
}

export default ProductItem;
