import React, { MouseEventHandler, ReactElement, FC } from "react";
import { Link } from "react-router-dom";

import { ProductImageProps } from "../ProductImage";
import { Icon } from "..";
import { COLOR, SIZE } from "../../constants/theme";
import { Container, ItemInfoWrap, Desc, Name, Price } from "./style";

interface ProductProps {
  id: string;
  Image: ReactElement<ProductImageProps>;
  name: string;
  price: number;
  onClickCart: MouseEventHandler<HTMLButtonElement>;
}

const Product: FC<ProductProps> = ({ id, Image, name, price, onClickCart }) => (
  <Container>
    <Link to={`/products/${id}`}>{Image}</Link>
    <ItemInfoWrap>
      <Link to={`/products/${id}`}>
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
