import React, { ReactElement, FC } from "react";

import { Link } from "react-router-dom";
import { ProductImageProps } from "../ProductImage";
import { ButtonProps } from "../Button";
import { Container, Desc, NameLink, OptionPricePart } from "./style";

interface OrderProductItemProps {
  id: string;
  Image: ReactElement<ProductImageProps>;
  Button?: ReactElement<ButtonProps>;
  name: string;
  price?: number;
  quantity: number;
}

const OrderProductItem: FC<OrderProductItemProps> = ({ id, Image, Button, name, price, quantity }) => (
  <Container>
    <Link to={`/cart/${id}`}>{Image}</Link>
    <Desc>
      <NameLink to={`/cart/${id}`}>{name}</NameLink>
      <OptionPricePart>
        {price && <span>{price} 원 / </span>}
        <span>수량 : {quantity}개</span>
      </OptionPricePart>
    </Desc>
    {Button}
  </Container>
);

export default OrderProductItem;
export { OrderProductItemProps };
