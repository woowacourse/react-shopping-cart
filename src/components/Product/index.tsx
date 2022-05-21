import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem, decrement, deleteItem, increment } from "../../redux/modules/cart";
import { show } from "../../redux/modules/snackBar";
import { useCartItemSelector, useCartListSelector } from "../../hooks/useCartSelector";
import routes from "../../routes";

import cart from "../../assets/cart.svg";
import {
  CartCounter,
  CartImageBadge,
  CartImageWrapper,
  ProductContainer,
  ProductImageWrapper,
  ProductInfo,
  ProductInfoContainer,
} from "./styles";

export type ProductType = {
  name: string;
  price: number;
  img: string;
  id: number;
};
interface ProductProps {
  productInfo: ProductType;
}

function Product({ productInfo: { name, price, img, id } }: ProductProps) {
  const [isShowCartCounter, setIsShowCartCounter] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItemList = useCartListSelector();
  const cartItem = useCartItemSelector(id);
  const timeout = useRef<NodeJS.Timeout>();

  const onClickCartImage = () => {
    setIsShowCartCounter((prev) => !prev);
    if (!cartItemList.some((item) => item.id === id)) {
      const newItem = { name, price, img, id, amount: 1, isSelected: false };

      dispatch(addItem(newItem));
      dispatch(show("장바구니에 추가되었습니다. 😍"));
    }
  };

  const onClickDecreaseCounter = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    if (cartItem?.amount === 1) {
      dispatch(deleteItem(id));
      setIsShowCartCounter(false);
      dispatch(show("장바구니에서 삭제되었습니다. 🥲"));
      return;
    }
    dispatch(decrement(id));
  };

  const onClickIncreaseCounter = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    if (cartItem) {
      dispatch(increment(id));
      return;
    }
    dispatch(addItem({ name, price, img, id, amount: 1, isSelected: false }));
  };

  useEffect(() => {
    if (isShowCartCounter) {
      timeout.current = setTimeout(() => {
        setIsShowCartCounter(false);
      }, 3000);
    }
  }, [isShowCartCounter, cartItem?.amount]);
  return (
    <ProductContainer>
      <ProductImageWrapper>
        <img onClick={() => navigate(routes.productDetail(id))} src={img} alt={name} />
      </ProductImageWrapper>
      <ProductInfoContainer>
        <ProductInfo onClick={() => navigate(routes.productDetail(id))}>
          <span>{name}</span>
          <span>{price.toLocaleString()}원</span>
        </ProductInfo>
        <CartImageWrapper>
          {cartItem?.amount && <CartImageBadge />}
          <img onClick={onClickCartImage} src={cart} alt="장바구니" />
        </CartImageWrapper>
        <CartCounter isShowCartCounter={isShowCartCounter}>
          <button onClick={onClickDecreaseCounter}>-</button>
          <span>{cartItem?.amount ?? 0}</span>
          <button onClick={onClickIncreaseCounter}>+</button>
        </CartCounter>
      </ProductInfoContainer>
    </ProductContainer>
  );
}

export default Product;
