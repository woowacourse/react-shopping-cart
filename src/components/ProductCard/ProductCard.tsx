import { memo } from "react";
import { ReactComponent as ShoppingCartIcon } from "../../assets/icon/shopping-cart.svg";
import Counter from "../common/Counter/Counter";
import ProductImg from "../ProductImg/ProductImg";
import ProductInfo from "./ProductInfo/ProductInfo";
import useCart from "../../hooks/useCart";
import Styled from "./ProductCardStyled";
import IconButton from "../common/IconButton/IconButton";

interface ProductCardProps {
  productId: number;
}

const ProductCard = ({ productId }: ProductCardProps) => {
  const {
    cart,
    product,
    isCartClicked,
    addToCart,
    plusQuantity,
    minusQuantity,
  } = useCart(productId);
  const { name, price, imageUrl } = product;

  return (
    <Styled.Container>
      <ProductImg theme={imgTheme} src={imageUrl} alt={name} />
      <Styled.ProductDetail>
        <ProductInfo name={name} price={price} />
        {isCartClicked ? (
          <Counter
            onPlus={plusQuantity}
            onMinus={minusQuantity}
            quantity={cart.quantity}
            theme={counterTheme}
          />
        ) : (
          <IconButton onClick={addToCart}>
            <ShoppingCartIcon />
          </IconButton>
        )}
      </Styled.ProductDetail>
    </Styled.Container>
  );
};

const counterTheme = {
  alignSelf: "auto",
  width: "72px",
  height: "32px",
};

const imgTheme = {
  width: "282px",
  height: "282px",
};
export default memo(ProductCard);
