import React, { MouseEventHandler, ReactElement, VFC } from "react";
import { Link } from "react-router-dom";

import { IProductImageProps } from "../ProductImage";
import { Icon } from "..";
import { COLOR, SIZE } from "../../constants/theme";
import { Container, ItemInfoWrap, Desc, Name, Price } from "./style";

interface IProductProps {
  id: string;
  Image: ReactElement<IProductImageProps>;
  name: string;
  price: number;
  onClickCart: MouseEventHandler<HTMLButtonElement>;
}

const Product: VFC<IProductProps> = ({ id, Image, name, price, onClickCart }) => (
  <Container>
    <Link to={`/products/${id}`}>{Image}</Link>
    <ItemInfoWrap>
      <Link to={`/products/${id}`}>
        <Desc>
          <Name>{name}</Name>
          <Price>{price}원</Price>
        </Desc>
      </Link>
      <button type="button" data-product-id={id} onClick={onClickCart}>
        <Icon.Cart size={SIZE.ICON.CART.SM} color={COLOR.GRAY_600} />
      </button>
    </ItemInfoWrap>
  </Container>
);

export default Product;
export { IProductProps };
