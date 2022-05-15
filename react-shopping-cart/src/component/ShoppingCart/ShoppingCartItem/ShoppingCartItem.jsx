import { useDispatch } from "react-redux";

import CheckBox from "component/@shared/CheckBox/CheckBox";
import ProductName from "component/@shared/ProductName/ProductName";
import ProductThumbnail from "component/@shared/ProductThumbnail/ProductThumbnail";
import ItemCounter from "component/ShoppingCart/ItemCounter/ItemCounter";
import ProductPrice from "component/@shared/ProductPrice/ProductPrice";
import {
  CartContainer,
  LeftContainer,
  RightContainer,
  TrashContainer,
} from "./ShoppingCartItem.style";

import { ReactComponent as Trash } from "assets/trash.svg";
import useClickCartButton from "hooks/useClickCartButton";
import { toggleIsChecked } from "redux/carts/carts.action";

function ShoppingCartItem({ id, name, thumbnail, price, checked }) {
  const { handleDeleteProduct } = useClickCartButton();
  const dispatch = useDispatch();

  const handleToggleCheckBox = () => {
    dispatch(toggleIsChecked(id));
  };

  return (
    <CartContainer>
      <LeftContainer>
        <CheckBox onChange={handleToggleCheckBox} checked={checked || false} />
        <ProductThumbnail type="shoppingCart" src={thumbnail} />
        <ProductName type="shoppingCart">{name}</ProductName>
      </LeftContainer>
      <RightContainer>
        <TrashContainer onClick={(e) => handleDeleteProduct(e, id)}>
          <Trash />
        </TrashContainer>
        <ItemCounter id={id} />
        <ProductPrice type="shoppingCart">{price}원</ProductPrice>
      </RightContainer>
    </CartContainer>
  );
}

export default ShoppingCartItem;
