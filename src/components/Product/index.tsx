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
  imageUrl: string;
  imageSize: string;
  name: string;
  price: number;
  onClickCart: MouseEventHandler<HTMLButtonElement>;
}

const Product: VFC<ProductProps> = ({ id, imageUrl, imageSize = "282px", name, price, onClickCart }) => (
  <Container>
    <Link
      to={{
        pathname: `${PATH.PRODUCT}/${id}`,
        state: { product: { productId: id, name, price, imageUrl: imageUrl } },
      }}
    >
      <ProductImage size={imageSize} src={imageUrl} alt={`${name}이미지`} />
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
