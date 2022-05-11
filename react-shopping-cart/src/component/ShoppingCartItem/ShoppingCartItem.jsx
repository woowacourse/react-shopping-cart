import styled from "styled-components";
import CheckBox from "../@shared/CheckBox/CheckBox";
import ProductName from "../@shared/ProductName/ProductName";
import ProductThumbnail from "../@shared/ProductThumbnail/ProductThumbnail";
import { ReactComponent as Trash } from "../../assets/trash.svg";
import ItemCounter from "../ItemCounter/ItemCounter";
import ProductPrice from "../@shared/ProductPrice/ProductPrice";

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

function ShoppingCartItem({ name, thumbnail, price }) {
  return (
    <CartContainer>
      <LeftContainer>
        <CheckBox type="checkbox" />
        <ProductThumbnail type="shoppingCart" src={thumbnail} />
        <ProductName type="shoppingCart">{name}</ProductName>
      </LeftContainer>
      <RightContainer>
        <TrashContainer>
          <Trash />
        </TrashContainer>
        <ItemCounter />
        <ProductPrice type="shoppingCart">{price}원</ProductPrice>
      </RightContainer>
    </CartContainer>
  );
}

export default ShoppingCartItem;
