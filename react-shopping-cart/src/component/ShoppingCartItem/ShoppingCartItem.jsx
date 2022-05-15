import styled from "styled-components";
import { useDispatch } from "react-redux";

import CheckBox from "component/@shared/CheckBox/CheckBox";
import ProductName from "component/@shared/ProductName/ProductName";
import ProductThumbnail from "component/@shared/ProductThumbnail/ProductThumbnail";
import ItemCounter from "component/ItemCounter/ItemCounter";
import ProductPrice from "component/@shared/ProductPrice/ProductPrice";

import { ReactComponent as Trash } from "assets/trash.svg";
import useClickCartButton from "hooks/useClickCartButton";
import { toggleIsChecked } from "redux/carts/carts.action";

const CartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 490px;
  padding: 20px 5px;
  border-top: 1px solid;
  border-color: ${({ theme }) => theme.colors["gray_03"]};
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-end;
`;

const TrashContainer = styled.div`
  cursor: pointer;
`;

function ShoppingCartItem({ id, name, thumbnail, price, checked }) {
  const { handleDeleteProduct } = useClickCartButton();
  const dispatch = useDispatch();

  const handleToggleCheckBox = () => {
    dispatch(toggleIsChecked(id));
  };

  return (
    <CartContainer>
      <LeftContainer>
        <CheckBox
          type="checkbox"
          onChange={handleToggleCheckBox}
          checked={checked || false}
        />
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
