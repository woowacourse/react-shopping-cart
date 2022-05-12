import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as Styled from "./styles";
import cart from "../../assets/cart.svg";
import { addItem, decrement, deleteItem, increment } from "../../redux/modules/cart";
import { useState } from "react";

import { useCartItemSelector, useCartListSelector } from "../../hooks/useCartSelector";

export type ProductType = {
  name: string;
  price: number;
  img: string;
  id: number;
};
interface ProductProps {
  productInfo: ProductType;
}

function Product({ productInfo }: ProductProps) {
  const [isShowCartCounter, setIsShowCartCounter] = useState(false);
  const { name, price, img, id } = productInfo;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useCartListSelector();
  const cartItem = useCartItemSelector(id);

  const onClickCartImage = () => {
    setIsShowCartCounter((prev) => !prev);
    if (!cartItems.some((items) => items.id === id)) {
      const newItem = { name, price, img, id, amount: 1 };

      dispatch(addItem(newItem));
    }
  };

  const onClickDecreaseCounter = () => {
    if (cartItem?.amount === 1) {
      dispatch(deleteItem(id));
      setIsShowCartCounter(false);
      alert("상품이 장바구니에서 삭제되었습니다.");
      return;
    }
    dispatch(decrement(id));
  };

  const conClickIncreaseCounter = () => {
    if (cartItem) {
      dispatch(increment(id));
      return;
    }
    dispatch(addItem({ name, price, img, id, amount: 1 }));
  };

  return (
    <Styled.ProductWrapper>
      <Styled.ProductImageWrapper>
        <Styled.ProductImage onClick={() => navigate(`/product/${id}`)} src={img} alt={name} />
      </Styled.ProductImageWrapper>
      <Styled.ProductInfoWrapper>
        <Styled.ProductInfo onClick={() => navigate(`/product/${id}`)}>
          <span>{name}</span>
          <span>{price.toLocaleString()}원</span>
        </Styled.ProductInfo>
        <Styled.CartImage onClick={onClickCartImage} src={cart} alt="장바구니" />
        <Styled.CartCounter isShowCartCounter={isShowCartCounter}>
          <Styled.CartCounterButton onClick={onClickDecreaseCounter}>-</Styled.CartCounterButton>
          <span>{cartItem?.amount ?? 0}</span>
          <Styled.CartCounterButton onClick={conClickIncreaseCounter}>+</Styled.CartCounterButton>
        </Styled.CartCounter>
      </Styled.ProductInfoWrapper>
    </Styled.ProductWrapper>
  );
}

export default Product;
