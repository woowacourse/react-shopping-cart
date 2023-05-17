import { memo } from "react";
import { ThemeProvider } from "styled-components";
import Styled from "./ShoppingCardStyled";
import useCart from "../../hooks/useCart";
import ProductImg from "../common/ProductImg/ProductImg";
import ProductName from "../common/ProductName/ProductName";
import { ReactComponent as DeleteIcon } from "../../assets/icon/delete.svg";
import IconButton from "../common/IconButton/IconButton";
import Counter from "../common/Counter/Counter";
import ProductPrice from "../common/ProductPrice/ProductPrice";

interface ShoppingCardProps {
  cartId: number;
}

const ShoppingCard = ({ cartId }: ShoppingCardProps) => {
  const { cart, plusQuantity, minusQuantity } = useCart(cartId);
  const { quantity, product } = cart;
  const { name, price, imageUrl } = product;

  const imgTheme = {
    width: "144px",
    height: "144px",
  };
  const nameTheme = {
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

  return (
    <Styled.Container>
      <Styled.Checkbox type="checkbox"></Styled.Checkbox>
      <ThemeProvider theme={imgTheme}>
        <ProductImg src={imageUrl} alt={name} />
      </ThemeProvider>
      <Styled.InfoContainer>
        <Styled.TopSection>
          <ThemeProvider theme={nameTheme}>
            <ProductName name={name} />
          </ThemeProvider>
          <IconButton onClick={() => {}}>
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
    </Styled.Container>
  );
};

export default memo(ShoppingCard);
