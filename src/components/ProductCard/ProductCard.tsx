import { memo } from "react";
import { ReactComponent as ShoppingCartImg } from "../../assets/icon/shopping-cart.svg";
import Counter from "../common/Counter/Counter";
import ProductImg from "../common/ProductImg/ProductImg";
import ProductInfo from "./ProductInfo/ProductInfo";
import useCart from "../../hooks/useCart";
import Styled from "./ProductCardStyled";

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
      <ProductImg src={imageUrl} alt={name} />
      <Styled.ProductDetail>
        <ProductInfo name={name} price={price} />
        {isCartClicked ? (
          <Counter
            plusQuantity={plusQuantity}
            minusQuantity={minusQuantity}
            quantity={cart.quantity}
          />
        ) : (
          <Styled.ShoppingCart onClick={addToCart}>
            <ShoppingCartImg />
          </Styled.ShoppingCart>
        )}
      </Styled.ProductDetail>
    </Styled.Container>
  );
};

export default memo(ProductCard);
