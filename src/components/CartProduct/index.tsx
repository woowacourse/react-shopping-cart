import CheckBox from "../@shared/CheckBox/styles";
import Delete from "../../assets/Delete.png";
import {
  CartProductContainer,
  ProductAmountContainer,
  ProductAmountWrapper,
  ProductCounterContainer,
  ProductImageContainer,
  ProductOptionContainer,
} from "./styles";

interface CartProductProps {
  name: string;
  img: string;
  price: number;
  amount: number;
}

function CartProduct({ name, img, price, amount }: CartProductProps) {
  return (
    <CartProductContainer>
      <CheckBox />
      <ProductImageContainer>
        <img src={img} alt={name} />
        <span>{name}</span>
      </ProductImageContainer>
      <ProductOptionContainer>
        <img src={Delete} alt="상품 삭제" />
        <ProductAmountContainer>
          <ProductAmountWrapper>{amount}</ProductAmountWrapper>
          <ProductCounterContainer>
            <button>▲</button>
            <button>▼</button>
          </ProductCounterContainer>
        </ProductAmountContainer>
        <span>{price.toLocaleString()}원</span>
      </ProductOptionContainer>
    </CartProductContainer>
  );
}

export default CartProduct;
