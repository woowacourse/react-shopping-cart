import { memo } from "react";
import { ThemeProvider } from "styled-components";
import Styled from "./ShoppingInfoStyled";
import useCart from "../../../hooks/useCart";
import ProductImg from "../../common/ProductImg/ProductImg";
import ProductName from "../../common/ProductName/ProductName";
import { ReactComponent as DeleteIcon } from "../../../assets/icon/delete.svg";
import IconButton from "../../common/IconButton/IconButton";
import Counter from "../../common/Counter/Counter";
import ProductPrice from "../../common/ProductPrice/ProductPrice";

interface ShoppingInfoProps {
  cartId: number;
  isDeleted: boolean;
  deleteChecked: () => void;
}

const ShoppingInfo = ({
  cartId,
  isDeleted,
  deleteChecked,
}: ShoppingInfoProps) => {
  const { cart, deleteToCart, plusQuantity, minusQuantity } = useCart(cartId);
  const { quantity, product } = cart;
  const { name, price, imageUrl } = product;

  const handleDelete = async () => {
    await deleteToCart();
  };

  if (isDeleted) handleDelete();

  return (
    <>
      <ThemeProvider theme={imgTheme}>
        <ProductImg src={imageUrl} alt={name} />
      </ThemeProvider>
      <Styled.InfoContainer>
        <Styled.TopSection>
          <ThemeProvider theme={nameTheme}>
            <ProductName name={name} />
          </ThemeProvider>
          <IconButton
            onClick={() => {
              deleteToCart();
              deleteChecked();
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Styled.TopSection>
        <ThemeProvider theme={counterTheme}>
          <Counter
            plusQuantity={plusQuantity}
            minusQuantity={minusQuantity}
            quantity={quantity}
          />
        </ThemeProvider>
        <ThemeProvider theme={priceTheme}>
          <ProductPrice price={price} />
        </ThemeProvider>
      </Styled.InfoContainer>
    </>
  );
};

const imgTheme = {
  width: "144px",
  height: "144px",
};
const nameTheme = {
  width: "332px",
  height: "42px",
  fontSize: "24px",
};
const counterTheme = {
  alignSelf: "end",

  width: "100px",
  height: "40px",
};
const priceTheme = {
  alignSelf: "end",
  fontSize: "16px",
};

export default memo(ShoppingInfo);
