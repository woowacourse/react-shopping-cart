import * as S from "./index.styles";
import RemoveIcon from "../../../../RemoveIcon";
import useShoppingCartProduct from "./hook/useShoppingCartProduct";
import ProductImage from "../../../../ProductImage";
import { useEffect, useState } from "react";

const ProductInfoContainer = ({
  id,
  imgUrl,
  title,
  isChecked,
  onProductCheckBoxClick,
  onItemClick,
}) => {
  return (
    <S.ProductInfoContainer>
      <S.ProductCheckBox
        type="checkbox"
        checked={isChecked}
        onChange={() => onProductCheckBoxClick(id)}
      />
      <ProductImage imgUrl={imgUrl} title={title} onItemClick={onItemClick} />
      <S.ProductTitle>{title}</S.ProductTitle>
    </S.ProductInfoContainer>
  );
};

const ProductQuantityControlContainer = ({
  price,
  productQuantity,
  onIncreaseIconClick,
  onDecreaseIconClick,
  onUpdateQuantityChange,
  onBackspaceKeyDown,
  onRemoveIconClick,
}) => {
  return (
    <S.ProductQuantityControlContainer>
      <button onClick={onRemoveIconClick} type="button">
        <RemoveIcon fill="#666" alt="삭제 버튼" />
      </button>
      <S.QuantityButtonControlContainer>
        <S.ProductQuantityInput
          type="number"
          value={productQuantity}
          onChange={onUpdateQuantityChange}
          onKeyDown={onBackspaceKeyDown}
        />
        <S.ButtonContainer>
          <S.QuantityButton type="button" onClick={onIncreaseIconClick}>
            🔼
          </S.QuantityButton>
          <S.QuantityButton type="button" onClick={onDecreaseIconClick}>
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
  const [isChecked, setChecked] = useState(true);
  const [productPrice, setProductPrice] = useState(0);

  const {
    handleProductCheckBoxClick,
    handleIncreaseIconClick,
    handleDecreaseIconClick,
    handleUpdateQuantityChange,
    handleBackspaceKeyDown,
    handleRemoveIconClick,
    handleItemClick,
  } = useShoppingCartProduct(id, isChecked, productPrice);

  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  useEffect(() => {
    setProductPrice(price * quantity);
  }, [price, quantity]);

  return (
    <S.ShoppingCartProduct>
      <ProductInfoContainer
        id={id}
        imgUrl={imgUrl}
        title={title}
        onProductCheckBoxClick={handleProductCheckBoxClick}
        onItemClick={handleItemClick(id)}
        isChecked={isChecked}
      />
      <ProductQuantityControlContainer
        price={productPrice}
        productQuantity={quantity}
        onIncreaseIconClick={handleIncreaseIconClick}
        onDecreaseIconClick={handleDecreaseIconClick}
        onUpdateQuantityChange={handleUpdateQuantityChange}
        onBackspaceKeyDown={handleBackspaceKeyDown}
        onRemoveIconClick={handleRemoveIconClick}
      />
    </S.ShoppingCartProduct>
  );
};

export default ShoppingCartProduct;
