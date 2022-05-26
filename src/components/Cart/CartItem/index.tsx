import Checkbox from "../../@shared/Checkbox";
import NumberInputButton from "../../@shared/NumberInputButton";
import * as S from "./index.styles";
import useProduct from "../../../hooks/useProduct";
import useCartItem from "../../../hooks/useCart";
import { isCart } from "../../../types/cart";
import React from "react";
import { isProduct } from "../../../types/product";

interface CartItemPros {
  id: number;
  cartId: string;
}

const CartItem = ({ id, cartId }: CartItemPros) => {
  let imgUrl = "",
    price = 0,
    title = "";
  let stock = 0,
    isChecked = false;

  const { product } = useProduct(id);
  const { getCart, changeCartStock, changeCartChecked, deleteCart } =
    useCartItem(cartId);
  const cart = getCart();
  if (isCart(cart)) {
    stock = cart.stock;
    isChecked = cart.isChecked;
  }

  const handleUpStockButton = () => {
    changeCartStock(stock + 1);
  };

  const handleDownStockButton = () => {
    if (stock <= 1) return;
    changeCartStock(stock - 1);
  };

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") return changeCartStock(1);
    changeCartStock(e.target.valueAsNumber);
  };

  const handleChangeClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeCartChecked(e.target.checked);
  };

  const handleDeleteButton = () => {
    deleteCart();
  };

  if (!Object.keys(product).length || product.isLoading) {
    return null;
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
