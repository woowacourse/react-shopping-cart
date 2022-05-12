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

  return (
    <Styled.ProductWrapper>
      <Styled.ProductImageWrapper>
        <Styled.ProductImage
          onClick={() => {
            navigate(`/product/${id}`);
          }}
          src={`${img}${id}`}
          alt={name}
        />
      </Styled.ProductImageWrapper>
      <Styled.ProductInfoWrapper>
        <Styled.ProductInfo
          onClick={() => {
            navigate(`/product/${id}`);
          }}
        >
          <span>{name}</span>
          <span>{price.toLocaleString()}원</span>
        </Styled.ProductInfo>
        <Styled.CartImage
          onClick={() => {
            setIsShowCartCounter((prev) => !prev);
            if (!cartItems.some((items) => items.id === id)) {
              dispatch(addItem({ name, price, img, id, amount: 1 }));
            }
          }}
          src={cart}
          alt="장바구니"
        />
        <Styled.CartCounter isShowCartCounter={isShowCartCounter}>
          <Styled.CartCounterButton
            onClick={() => {
              if (cartItem?.amount === 1) {
                dispatch(deleteItem(id));
                setIsShowCartCounter(false);
                alert("상품이 장바구니에서 삭제되었습니다.");
                return;
              }
              dispatch(decrement(id));
            }}
          >
            -
          </Styled.CartCounterButton>
          <span>{cartItem?.amount ?? 0}</span>
          <Styled.CartCounterButton
            onClick={() => {
              if (cartItem) {
                dispatch(increment(id));
              } else {
                dispatch(addItem({ name, price, img, id, amount: 1 }));
              }
            }}
          >
            +
          </Styled.CartCounterButton>
        </Styled.CartCounter>
      </Styled.ProductInfoWrapper>
    </Styled.ProductWrapper>
  );
}

export default Product;
