import * as S from "./index.styles";
import ShoppingCartIcon from "../ShoppingCartIcon";
import { useDispatch } from "react-redux";
import { useTheme } from "@emotion/react";
import { postCartProduct } from "../../modules/cartProducts";
import {
  setSnackBarTypeFail,
  setSnackBarTypeSuccess,
} from "../../modules/snackBar";
import ProductImage from "../ProductImage";

const Product = ({
  imgUrl,
  title,
  price,
  onItemClick,
  product,
  isInShoppingCart,
  id,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleCartClick = () => {
    dispatch(
      postCartProduct(id, product, setSnackBarTypeSuccess, setSnackBarTypeFail)
    );
  };

  return (
    <S.ProductContainer>
      <ProductImage imgUrl={imgUrl} title={title} onItemClick={onItemClick} />
      <S.ProductInfoWrapper>
        <div onClick={onItemClick}>
          <S.ProductInfo>{title}</S.ProductInfo>
          <S.ProductInfo>{price}원</S.ProductInfo>
        </div>
        <button type="button" onClick={handleCartClick}>
          <ShoppingCartIcon
            width="30px"
            height="30px"
            fill={isInShoppingCart ? theme.color.primary : theme.color.black}
          />
        </button>
      </S.ProductInfoWrapper>
    </S.ProductContainer>
  );
};

export default Product;
