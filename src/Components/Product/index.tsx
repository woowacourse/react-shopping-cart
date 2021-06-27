import React, { MouseEventHandler, ReactElement } from "react";
import { Link } from "react-router-dom";

import { ProductImageProps } from "../ProductImage";
import { Icon } from "..";
import { COLOR, SIZE } from "../../constants/theme";
import { Container, ItemInfoWrap, Desc, Name, Price } from "./style";

interface ProductProps {
  id: number;
  Image: ReactElement<ProductImageProps>;
  name: string;
  price: number;
  onClickCart: MouseEventHandler<HTMLButtonElement>;
}

const Product = ({ id, Image, name, price, onClickCart }: ProductProps) => (
  <Container>
    <Link to={`/products?productId=${id}`}>{Image}</Link>
    <ItemInfoWrap>
      <Link to={`/products?productId=${id}`}>
        <Desc>
          <Name>{name}</Name>
          <Price>{price.toLocaleString("ko-KR")}원</Price>
        </Desc>
      </Link>
      <button type="button" onClick={onClickCart}>
        <Icon.Cart size={SIZE.ICON.CART.SM} color={COLOR.GRAY_600} />
      </button>
    </ItemInfoWrap>
  </Container>
);

export default Product;
export { ProductProps };
