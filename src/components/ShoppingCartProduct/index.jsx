import * as S from "./index.styles";
import RemoveIcon from "../../assets/image/remove.svg";

const ProductInfoContainer = ({ imgUrl, title }) => {
  return (
    <S.ProductInfoContainer>
      <S.ProductCheckBox type="checkbox" />
      <S.ProductImage src={imgUrl} alt={`${title}-이미지`} />
      <S.ProductTitle>{title}</S.ProductTitle>
    </S.ProductInfoContainer>
  );
};

const ProductQuantityControlContainer = ({
  price,
  productQuantity,
  handleDecrement,
  handleIncrement,
}) => {
  return (
    <S.ProductQuantityControlContainer>
      <button type="button">
        <img src={RemoveIcon} alt="삭제 버튼" />
      </button>
      <S.QuantityButtonControlContainer>
        <S.ProductQuantity>{productQuantity}</S.ProductQuantity>
        <S.ButtonContainer>
          <S.QuantityButton type="button" onClick={handleIncrement}>
            ⬆
          </S.QuantityButton>
          <S.QuantityButton type="button" onClick={handleDecrement}>
            ⬇
          </S.QuantityButton>
        </S.ButtonContainer>
      </S.QuantityButtonControlContainer>
      <S.ProductPrice>{price}원</S.ProductPrice>
    </S.ProductQuantityControlContainer>
  );
};

const ShoppingCartProduct = ({
  productQuantity,
  imgUrl,
  title,
  price,
  handleIncrement,
  handleDecrement,
}) => {
  return (
    <S.ShoppingCartProduct>
      <ProductInfoContainer imgUrl={imgUrl} title={title} />
      <ProductQuantityControlContainer
        price={price}
        productQuantity={productQuantity}
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
      />
    </S.ShoppingCartProduct>
  );
};

export default ShoppingCartProduct;
