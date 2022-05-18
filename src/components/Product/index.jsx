import * as S from "./index.styles";
import ShoppingCartIcon from "../ShoppingCartIcon";

const Product = ({ imgUrl, title, price, onClick, shoppingCartColor }) => {
  return (
    <S.ProductContainer onClick={onClick}>
      <S.ProductImage src={imgUrl} alt={`${title} 이미지`} />
      <S.ProductInfoWrapper>
        <div>
          <S.ProductInfo>{title}</S.ProductInfo>
          <S.ProductInfo>{price}원</S.ProductInfo>
        </div>
        <ShoppingCartIcon width="30px" height="30px" fill={shoppingCartColor} />
      </S.ProductInfoWrapper>
    </S.ProductContainer>
  );
};

export default Product;
