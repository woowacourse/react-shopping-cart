import React, { ReactElement, VFC } from "react";

import { Link } from "react-router-dom";
import { IProductImageProps } from "../ProductImage";
import { IButtonProps } from "../Button";
import { Container, Desc, NameLink, OptionPricePart } from "./style";

// TODO: price => optional이 맞는가?
interface OrderProductItemProps {
  id: string;
  Image: ReactElement<IProductImageProps>;
  Button?: ReactElement<IButtonProps>;
  name: string;
  price?: number;
  quantity: number;
}

// TODO: Image, Button 등을 엘리먼트로 주입 받는 것이 좋은 지?
const OrderProductItem: VFC<OrderProductItemProps> = ({
  id,
  Image,
  Button,
  name,
  price,
  quantity,
}) => (
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
