import { memo } from "react";
import styled, { ThemeProvider } from "styled-components";
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
  const { cart, product, plusQuantity, minusQuantity } = useCart(cartId);
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
    width: "124px",
    height: "50px",
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
            quantity={1}
          />
        </ThemeProvider>
        <ThemeProvider theme={priceTheme}>
          <ProductPrice price={price} />
        </ThemeProvider>
      </Styled.InfoContainer>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.div`
    display: flex;
    width: 100%;
    gap: 15px;
  `,
  Checkbox: styled.input`
    width: 28px;
    height: 28px;
  `,
  InfoContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 23px;

    width: 100%;
  `,
  TopSection: styled.section`
    display: flex;
    justify-content: space-between;
  `,
};

export default memo(ShoppingCard);
