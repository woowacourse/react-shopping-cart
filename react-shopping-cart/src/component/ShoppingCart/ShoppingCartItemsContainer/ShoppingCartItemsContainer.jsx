import ShoppingCartItem from "component/ShoppingCart/ShoppingCartItem/ShoppingCartItem";

import { ColumnFlexWrapper } from "styles/Wrapper";

function ShoppingCartItemsContainer({ carts }) {
  return (
    <ColumnFlexWrapper>
      {carts.map(({ id, name, image, price, checked }) => (
        <ShoppingCartItem
          key={id}
          id={id}
          name={name}
          thumbnail={image}
          price={price}
          checked={checked}
        />
      ))}
    </ColumnFlexWrapper>
  );
}

export default ShoppingCartItemsContainer;
