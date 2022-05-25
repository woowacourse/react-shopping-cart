import * as S from "./index.styles";

const ProductDetails = ({ imgUrl, title, price, handlePutInShoppingCart }) => {
  return (
    <S.ProductDetailsContainer>
      <S.ProductDetailsImage src={imgUrl} alt={`${title} 상세이미지`} />
      <S.ProductDetailsTitle>{title}</S.ProductDetailsTitle>
      <S.PriceContainer>
        <p>금액</p>
        <p>{price}원</p>
      </S.PriceContainer>
      <S.ShoppingCartButton onClick={handlePutInShoppingCart} type="button">
        장바구니
      </S.ShoppingCartButton>
    </S.ProductDetailsContainer>
  );
};

export default ProductDetails;
