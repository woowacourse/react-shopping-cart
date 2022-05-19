import * as S from "./index.styles";
import RemoveIcon from "../RemoveIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementCartProductQuantity,
  incrementCartProductQuantity,
  removeCartProduct,
  updateCartProductChecked,
  updateCartProductQuantityByUserInput,
} from "../../modules/products";

const ProductInfoContainer = ({ imgUrl, title, isChecked, handleChecked }) => {
  return (
    <S.ProductInfoContainer>
      <S.ProductCheckBox
        type="checkbox"
        checked={isChecked}
        onChange={handleChecked}
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

const ShoppingCartProduct = ({ imgUrl, title, price, id, isChecked }) => {
  const dispatch = useDispatch();
  const shoppingCartProducts = useSelector(
    (state) => state.shoppingCartProducts
  );

  const shoppingCartProduct = shoppingCartProducts.data.find(
    (product) => product.id === id
  );

  const handleIncrement = () => {
    dispatch(incrementCartProductQuantity(id));
  };

  const handleDecrement = () => {
    dispatch(decrementCartProductQuantity(id));
  };

  const handleUpdateQuantityByUser = ({ target }) => {
    dispatch(updateCartProductQuantityByUserInput(id, target.value));
  };

  const handleBackspaceByUser = (event) => {
    const { key, target } = event;

    if (key !== "Backspace") return;
    if (target.value.length !== 1) return;

    event.preventDefault();
    target.select();
  };

  const handleRemoveProduct = () => {
    dispatch(removeCartProduct(id));
  };

  const handleChecked = () => {
    dispatch(updateCartProductChecked(id));
  };

  return (
    <S.ShoppingCartProduct>
      <ProductInfoContainer
        imgUrl={imgUrl}
        title={title}
        handleChecked={handleChecked}
        isChecked={isChecked}
      />
      <ProductQuantityControlContainer
        price={price}
        productQuantity={shoppingCartProduct.quantity}
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
