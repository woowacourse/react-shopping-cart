import React, { MouseEventHandler, ReactElement, VFC } from "react";
import { Link } from "react-router-dom";

import ProductImage, { ProductImageProps } from "../ProductImage";
import { CartIcon } from "..";
import { COLOR, SIZE } from "../../constants/theme";
import { Container, ItemInfoWrap, Desc, Name, Price } from "./style";

interface ProductProps {
  id: string;
  imageSrc: string;
  imageSize: string;
  name: string;
  price: number;
  onClickCart: MouseEventHandler<HTMLButtonElement>;
}

const Product: VFC<ProductProps> = ({ id, imageSrc, imageSize = "282px", name, price, onClickCart }) => (
  <Container>
    <Link to={`/products/${id}`}>
      <ProductImage size={imageSize} src={imageSrc} alt={`${name}이미지`} />,
    </Link>
    <ItemInfoWrap>
      <Link to={`/products/${id}`}>
        <Desc>
          <Name>{name}</Name>
          <Price>{price}원</Price>
        </Desc>
      </Link>
      <button type="button" onClick={onClickCart}>
        <CartIcon size={SIZE.ICON.CART.SM} color={COLOR.GRAY_600} />
      </button>
    </ItemInfoWrap>
  </Container>
);

export default Product;
export { ProductProps };
