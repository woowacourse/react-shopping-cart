import { memo, useEffect } from "react";
import Styled from "./ShoppingInfoStyled";
import useCart from "../../../hooks/useCart";
import ProductImg from "../../ProductImg/ProductImg";
import ProductName from "../../ProductName/ProductName";
import { ReactComponent as DeleteIcon } from "../../../assets/icon/delete.svg";
import IconButton from "../../common/IconButton/IconButton";
import Counter from "../../common/Counter/Counter";
import ProductPrice from "../../ProductPrice/ProductPrice";
import { checkedCartIdAtom } from "../../../store/cartState";
import { useRecoilValue } from "recoil";

interface ShoppingInfoProps {
  cartId: number;
  isDelete: boolean;
  onDelete: () => void;
}

const ShoppingInfo = ({ cartId, isDelete, onDelete }: ShoppingInfoProps) => {
  const checkedIdList = useRecoilValue(checkedCartIdAtom);
  const { cart, deleteToCart, plusQuantity, minusQuantity } = useCart(cartId);
  const { quantity, product } = cart;
  const { name, price, imageUrl } = product;

  useEffect(() => {
    const check = checkedIdList.find((id) => id === cartId);
    if (isDelete && check) deleteToCart();
  }, [isDelete]); // eslint-disable-line

  return (
    <>
      <ProductImg
        theme={imgTheme}
        src={imageUrl ? imageUrl : undefined}
        alt={name}
      />
      <Styled.InfoContainer>
        <Styled.TopSection>
          <ProductName theme={nameTheme} name={name} />
          <IconButton
            onClick={() => {
              deleteToCart();
              onDelete();
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Styled.TopSection>
        <Counter
          onPlus={plusQuantity}
          onMinus={minusQuantity}
          quantity={quantity}
          theme={counterTheme}
        />
        <ProductPrice theme={priceTheme} price={price} />
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
  fontWeight: "Regular",
  fontSize: "16px",
};

export default memo(ShoppingInfo);
