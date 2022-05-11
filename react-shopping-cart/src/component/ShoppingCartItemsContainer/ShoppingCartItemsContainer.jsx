import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectCurrentCarts } from "../../redux/carts/carts.selector";
import { ColumnFlexWrapper } from "../../styles/Wrapper";
import ShoppingCartItem from "../ShoppingCartItem/ShoppingCartItem";
import { CURRENT_USER } from "../../constants/index";

const ShoppingCartItemBox = styled(ColumnFlexWrapper)``;

function ShoppingCartItemsContainer() {
  const carts = useSelector(selectCurrentCarts);

  return (
    <ShoppingCartItemBox>
      {carts.map(({ id, name, image, price, user }) => {
        if (user === CURRENT_USER) {
          return (
            <ShoppingCartItem
              key={id}
              name={name}
              thumbnail={image}
              price={price}
            />
          );
        }
        return null;
      })}
    </ShoppingCartItemBox>
  );
}

export default ShoppingCartItemsContainer;
