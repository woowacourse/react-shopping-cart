import React, { ReactElement, VFC } from "react";
import { Link } from "react-router-dom";

import { ProductImage } from "..";
import { Container, Desc, NameLink, OptionPricePart } from "./style";

import { toNumberWithComma } from "../../utils/format";

interface OrderProductItemProps {
  id: string;
  imageSrc: string;
  imageSize?: string;
  Button?: ReactElement;
  name: string;
  price?: number;
  quantity: number;
}

const OrderProductItem: VFC<OrderProductItemProps> = ({
  id,
  imageSrc,
  imageSize = "7.5rem",
  Button,
  name,
  price,
  quantity,
}) => (
  <Container>
    <Link to={`/cart/${id}`}>
      <ProductImage size={imageSize} src={imageSrc} alt={`${name}이미지`} />
    </Link>
    <Desc>
      <NameLink to={`/cart/${id}`}>{name}</NameLink>
      <OptionPricePart>
        {price && <span>{toNumberWithComma(price)} 원 / </span>}
        <span>수량 : {quantity}개</span>
      </OptionPricePart>
    </Desc>
    {Button}
  </Container>
);

export default OrderProductItem;
export { OrderProductItemProps };
