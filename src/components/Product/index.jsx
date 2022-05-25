import * as S from "./index.styles";
import ShoppingCartIcon from "../ShoppingCartIcon";
import { useDispatch } from "react-redux";
import { useTheme } from "@emotion/react";
import { postCartProduct } from "../../modules/cartProducts";
import {
  setSnackBarTypeFail,
  setSnackBarTypeSuccess,
} from "../../modules/snackBar";

const Product = ({
  imgUrl,
  title,
  price,
  handleItemClick,
  product,
  isInShoppingCart,
  id,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handlePutInShoppingCart = () => {
    dispatch(
      postCartProduct(id, product, setSnackBarTypeSuccess, setSnackBarTypeFail)
    );
  };

  return (
    <S.ProductContainer>
      <S.ProductImage
        src={imgUrl}
        alt={`${title} 이미지`}
        onClick={handleItemClick}
      />
      <S.ProductInfoWrapper>
        <div onClick={handleItemClick}>
          <S.ProductInfo>{title}</S.ProductInfo>
          <S.ProductInfo>{price}원</S.ProductInfo>
        </div>
        <button type="button" onClick={handlePutInShoppingCart}>
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
