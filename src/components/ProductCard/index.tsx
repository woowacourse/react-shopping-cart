import { memo } from "react";
import styled from "styled-components";
import { ReactComponent as ShoppingCartImg } from "../../assets/icon/shopping-cart.svg";
import Counter from "../Counter";
import ProductImg from "./ProductImg";
import ProductInfo from "./ProductInfo";
import useCart from "../../hooks/useCart";

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

const Styled = {
  Container: styled.li`
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 282px;
  `,

  ProductDetail: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  ShoppingCart: styled.button`
    display: flex;

    cursor: pointer;
  `,
};
export default memo(ProductCard);
