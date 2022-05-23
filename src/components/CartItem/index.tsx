import Checkbox from "../Checkbox";
import NumberInputButton from "../NumberInputButton";
import * as S from "./index.styles";
import useProduct from "../../hooks/useProduct";
import useCart from "../../hooks/useCart";
import { CartType } from "../../types/cart";
import React from "react";

interface CartItemPros {
  id: number;
  cartId: string;
}

const CartItem = ({ id, cartId }: CartItemPros) => {
  const { product } = useProduct(id);
  const { getCart, changeCartStock, changeCartChecked, deleteCart } = useCart();
  const cart = getCart(cartId) as CartType;

  const handleUpStockButton = () => {
    changeCartStock(cartId, cart.stock + 1);
  };

  const handleDownStockButton = () => {
    if (cart?.stock <= 1) return;
    changeCartStock(cartId, cart.stock - 1);
  };

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") return changeCartStock(cartId, 1);
    changeCartStock(cartId, e.target.valueAsNumber);
  };

  const handleChangeClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeCartChecked(cartId, e.target.checked);
  };

  const handleDeleteButton = () => {
    deleteCart(cart.id);
  };

  if (!Object.keys(product).length) {
    return <div></div>;
  }

  if (product.isLoading) {
    return <div></div>;
  }

  return (
    <S.CartItemContainer>
      <S.ItemContainer>
        <Checkbox
          id={id}
          value={cart?.isChecked}
          handleChange={handleChangeClick}
        />
        <S.ItemImage
          src={product.data?.imgUrl}
          alt={`${product.data?.title}이미지`}
        />
        <span>{product.data?.title}</span>
      </S.ItemContainer>
      <S.ItemRightContainer>
        <S.CartButton onClick={handleDeleteButton}>🗑</S.CartButton>
        <NumberInputButton
          value={cart?.stock}
          downButtonClick={handleDownStockButton}
          upButtonClick={handleUpStockButton}
          handleChange={handleChangeNumber}
        />
        <p>{(product.data?.price * cart?.stock).toLocaleString("ko-kr")}원</p>
      </S.ItemRightContainer>
    </S.CartItemContainer>
  );
};

export default CartItem;
