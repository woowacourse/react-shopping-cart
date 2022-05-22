import * as S from "./index.styles";
import ShoppingCartIcon from "../ShoppingCartIcon";
import { useDispatch } from "react-redux";
import { useTheme } from "@emotion/react";
import { postCartProduct } from "../../modules/cartProducts";

const Product = ({
  imgUrl,
  title,
  price,
  onClick,
  product,
  isInShoppingCart,
  id,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handlePutInShoppingCart = () => {
    dispatch(postCartProduct(id, product));
  };

  return (
    <S.ProductContainer>
      <S.ProductImage src={imgUrl} alt={`${title} 이미지`} onClick={onClick} />
      <S.ProductInfoWrapper>
        <div onClick={onClick}>
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
