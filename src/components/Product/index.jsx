import * as S from "./index.styles";
import ShoppingCartIcon from "../ShoppingCartIcon";
import { useDispatch } from "react-redux";
import { postCartProduct } from "../../modules/products";
import { useState } from "react";
import SnackBar from "../../modal/SnackBar";
import { useTheme } from "@emotion/react";

const Product = ({
  imgUrl,
  title,
  price,
  onClick,
  product,
  isInShoppingCart,
  id,
}) => {
  const [isCartIconClicked, setCartIconClicked] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();

  const handlePutInShoppingCart = () => {
    dispatch(postCartProduct(id, product));

    setCartIconClicked((prevState) => !prevState);
    setTimeout(() => {
      setCartIconClicked((prevState) => !prevState);
    }, 700);
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
      {isCartIconClicked && <SnackBar message="장바구니에 상품이 담겼습니다" />}
    </S.ProductContainer>
  );
};

export default Product;
