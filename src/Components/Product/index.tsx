import React, { MouseEventHandler, VFC } from "react";
import { Link } from "react-router-dom";

import ProductImage from "../ProductImage";
import { CartIcon } from "..";
import { Container, ItemInfoWrap, Desc, Name, Price } from "./style";

import { COLOR, SIZE } from "../../constants/theme";
import { PATH } from "../../constants/path";

import { toNumberWithComma } from "../../utils/format";

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
    <Link
      to={{
        pathname: `${PATH.PRODUCT}/${id}`,
        state: { product: { product_id: id, name, price, image_url: imageSrc } },
      }}
    >
      <ProductImage size={imageSize} src={imageSrc} alt={`${name}이미지`} />
    </Link>
    <ItemInfoWrap>
      <Link to={`${PATH.PRODUCT}/${id}`}>
        <Desc>
          <Name>{name}</Name>
          <Price>{toNumberWithComma(price)}원</Price>
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
