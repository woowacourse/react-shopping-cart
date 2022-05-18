import * as S from "./index.styles";
import ShoppingCartIcon from "../ShoppingCartIcon";

const Product = ({ imgUrl, title, price, onClick, go, shoppingCartColor }) => {
  return (
    <S.ProductContainer>
      <S.ProductImage onClick={onClick} src={imgUrl} alt={`${title} 이미지`} />
      <S.ProductInfoWrapper>
        <div onClick={onClick}>
          <S.ProductInfo>{title}</S.ProductInfo>
          <S.ProductInfo>{price}원</S.ProductInfo>
        </div>
        <S.ShoppingCartButton onClick={go}>
          <ShoppingCartIcon
            width="30px"
            height="30px"
            fill={shoppingCartColor}
          />
        </S.ShoppingCartButton>
      </S.ProductInfoWrapper>
    </S.ProductContainer>
  );
};

export default Product;
