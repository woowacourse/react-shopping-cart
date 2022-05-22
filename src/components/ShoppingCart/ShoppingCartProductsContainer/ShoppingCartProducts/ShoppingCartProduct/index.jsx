import * as S from "./index.styles";
import RemoveIcon from "../../../../RemoveIcon";
import useShoppingCartProduct from "./hook/useShoppingCartProduct";

const ProductInfoContainer = ({
  id,
  imgUrl,
  title,
  isChecked,
  handleChecked,
}) => {
  return (
    <S.ProductInfoContainer>
      <S.ProductCheckBox
        type="checkbox"
        checked={isChecked}
        onChange={() => handleChecked(id)}
      />
      <S.ProductImage src={imgUrl} alt={`${title}-이미지`} />
      <S.ProductTitle>{title}</S.ProductTitle>
    </S.ProductInfoContainer>
  );
};

const ProductQuantityControlContainer = ({
  price,
  productQuantity,
  handleIncrement,
  handleDecrement,
  handleUpdateQuantityByUser,
  handleBackspaceByUser,
  handleRemoveProduct,
}) => {
  return (
    <S.ProductQuantityControlContainer>
      <button onClick={handleRemoveProduct} type="button">
        <RemoveIcon fill="#666" alt="삭제 버튼" />
      </button>
      <S.QuantityButtonControlContainer>
        <S.ProductQuantityInput
          type="number"
          value={productQuantity}
          onChange={handleUpdateQuantityByUser}
          onKeyDown={handleBackspaceByUser}
        />
        <S.ButtonContainer>
          <S.QuantityButton type="button" onClick={handleIncrement}>
            🔼
          </S.QuantityButton>
          <S.QuantityButton type="button" onClick={handleDecrement}>
            🔽
          </S.QuantityButton>
        </S.ButtonContainer>
      </S.QuantityButtonControlContainer>
      <S.ProductPrice>{price}원</S.ProductPrice>
    </S.ProductQuantityControlContainer>
  );
};

const ShoppingCartProduct = ({
  checked,
  imgUrl,
  title,
  price,
  quantity,
  id,
}) => {
  const {
    handleChecked,
    handleIncrement,
    handleDecrement,
    handleUpdateQuantityByUser,
    handleBackspaceByUser,
    handleRemoveProduct,
    isChecked,
    productPrice,
  } = useShoppingCartProduct(id, checked, price, quantity);

  return (
    <S.ShoppingCartProduct>
      <ProductInfoContainer
        id={id}
        imgUrl={imgUrl}
        title={title}
        handleChecked={handleChecked}
        isChecked={isChecked}
      />
      <ProductQuantityControlContainer
        price={productPrice}
        productQuantity={quantity}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        handleUpdateQuantityByUser={handleUpdateQuantityByUser}
        handleBackspaceByUser={handleBackspaceByUser}
        handleRemoveProduct={handleRemoveProduct}
      />
    </S.ShoppingCartProduct>
  );
};

export default ShoppingCartProduct;
