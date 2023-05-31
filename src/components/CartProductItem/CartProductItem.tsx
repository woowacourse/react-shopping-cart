import styled from "styled-components";
import CheckBox from "../common/CheckBox/CheckBox";
import DeleteButton from "../common/DeleteButton/DeleteButton";
import RectangleQuantityInput from "../RectangleQuantityInput/RectangleQuantityInput";
import type { ProductCardProps } from "../../types";
import { useCartQuantityUpdater } from "../../hooks/useCartInfosUpdater";
import { useCheckBoxesToggler } from "../../hooks/useCheckBox";
import { useCartProductRemover } from "../../hooks/useCartProductRemover";
import { useState } from "react";
import dataUploader from "../../domains/dataUploader";
import { IdQuantity } from "../../types";

const CartProductItem = ({
  productId,
  productImage,
  productName,
  productPrice,
  productQuantity,
}: ProductCardProps) => {
  const [quantity, setQuantity] = useState(productQuantity);
  const { updateCartQuantity } = useCartQuantityUpdater();
  const { getIsChecked, toggleChecked } = useCheckBoxesToggler();
  const { removeCartProduct } = useCartProductRemover();

  const uploadQuantity = ({ id, quantity }: IdQuantity) => {
    setQuantity(() => quantity);
    updateCartQuantity({ id, quantity });

    if (quantity === 1) {
      dataUploader.addCartProduct({ productId: id });
      return;
    }
    
    if (quantity === 0) {
      dataUploader.removeCartProduct(id);
      return;
    }

    dataUploader.updateQuantity({ id, quantity });
  };

  return (
    <Container>
      <ProductCheckBox
        isChecked={getIsChecked(productId)}
        onCheckedChange={() => toggleChecked(productId)}
      />
      <ProductImage src={productImage} />
      <ProductName>{productName}</ProductName>
      <DeleteButtonContainer>
        <DeleteButton
          productId={productId}
          notifyParentWhenDeleteTriggered={removeCartProduct}
        />
      </DeleteButtonContainer>
      <QuantityInputContainer>
        <RectangleQuantityInput
          productId={productId}
          initialValue={productQuantity}
          minValue={1}
          onChange={uploadQuantity}
        />
      </QuantityInputContainer>
      <ProductPrice>
        ₩ {(quantity * productPrice).toLocaleString()}
      </ProductPrice>
    </Container>
  );
};

const colors = {
  darkGray: "#111",
  pureWhite: "#fff",
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
  color: ${colors.pureWhite};
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
  color: ${colors.pureWhite};
  text-align: right;
  grid-area: price;
`;

export default CartProductItem;
