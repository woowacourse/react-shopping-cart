import Checkbox from "../Checkbox";
import NumberInputButton from "../NumberInputButton";
import * as S from "./index.styles";
import useProduct from "../../hooks/useProduct";
import useCart from "../../hooks/useCart";
import { isCart } from "../../types/cart";
import React from "react";
import { isProduct } from "../../types/product";

interface CartItemPros {
  id: number;
  cartId: string;
}

const CartItem = ({ id, cartId }: CartItemPros) => {
  const { product } = useProduct(id);
  const { getCart, changeCartStock, changeCartChecked, deleteCart } = useCart();
  const cart = getCart(cartId);
  let stock = 0,
    isChecked = false;

  if (isCart(cart)) {
    stock = cart.stock;
    isChecked = cart.isChecked;
  }

  let imgUrl = "",
    price = 0,
    title = "";

  const handleUpStockButton = () => {
    changeCartStock(cartId, stock + 1);
  };

  const handleDownStockButton = () => {
    if (stock <= 1) return;
    changeCartStock(cartId, stock - 1);
  };

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") return changeCartStock(cartId, 1);
    changeCartStock(cartId, e.target.valueAsNumber);
  };

  const handleChangeClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeCartChecked(cartId, e.target.checked);
  };

  const handleDeleteButton = () => {
    deleteCart(cartId);
  };

  if (!Object.keys(product).length) {
    return <div></div>;
  }

  if (product.isLoading) {
    return <div></div>;
  }

  if (isProduct(product.data)) {
    imgUrl = product.data.imgUrl;
    title = product.data.title;
    price = product.data.price;
  }

  return (
    <S.CartItemContainer>
      <S.ItemContainer>
        <Checkbox id={id} value={isChecked} handleChange={handleChangeClick} />
        <S.ItemImage src={imgUrl} alt={`${title}이미지`} />
        <span>{title}</span>
      </S.ItemContainer>
      <S.ItemRightContainer>
        <S.CartButton onClick={handleDeleteButton}>🗑</S.CartButton>
        <NumberInputButton
          value={stock}
          downButtonClick={handleDownStockButton}
          upButtonClick={handleUpStockButton}
          handleChange={handleChangeNumber}
        />
        <p>{(price * stock).toLocaleString("ko-kr")}원</p>
      </S.ItemRightContainer>
    </S.CartItemContainer>
  );
};

export default CartItem;
