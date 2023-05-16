import styled from "styled-components";
import CheckBox from "../common/CheckBox/CheckBox";
import DeleteButton from "../common/DeleteButton/DeleteButton";
import RectangleQuantityInput from "../RectangleQuantityInput/RectangleQuantityInput";
import type { ProductCardProps } from "../../types";

const CartProductItem = ({
  productId,
  productImage,
  productName,
  productPrice,
}: ProductCardProps) => {
  return (
    <Container>
      <ProductCheckBox notifyParentWhenCheckedChanged={() => {}} />
      <ProductImage src={productImage} />
      <ProductName>{productName}</ProductName>
      <DeleteButtonContainer>
        <DeleteButton
          productId={productId}
          notifyParentWhenDeleteTriggered={() => {}}
        />
      </DeleteButtonContainer>
      <QuantityInputContainer>
        <RectangleQuantityInput productId={productId} />
      </QuantityInputContainer>
      <ProductPrice>₩ {productPrice.toLocaleString()}</ProductPrice>
    </Container>
  );
};

const colors = {
  darkGray: "#111",
};

const Container = styled.div`
  box-sizing: content-box;
  display: grid;
  width: 736px;
  height: 144px;
  padding: 15px;
  background-color: ${colors.darkGray};
  grid-template-columns: 28px 144px 405px 114px;
  grid-template-rows: 28px 60px 28px;
  column-gap: 15px;
  row-gap: 14px;
  grid-template-areas:
    "checkbox image name deleteButton"
    "checkbox image name quantityInput"
    "checkbox image name price";
`;

const ProductCheckBox = styled(CheckBox)`
  grid-area: checkbox;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  grid-area: image;
`;

const ProductName = styled.div`
  color: white;
  grid-area: name;
  font-size: 20px;
`;

const DeleteButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  grid-area: deleteButton;
`;

const QuantityInputContainer = styled.div`
  grid-area: quantityInput;
`;

const ProductPrice = styled.div`
  color: white;
  text-align: right;
  grid-area: price;
`;

export default CartProductItem;
