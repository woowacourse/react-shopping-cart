import React, { VFC } from "react";
import { Link } from "react-router-dom";

import { IProductImageProps } from "../ProductImage";
import { Icon } from "..";
import { COLOR, SIZE } from "../../constants/theme";
import { Container, Desc, Name, Price, CartButton } from "./style";

interface IProductProps {
  Image: React.ReactElement<IProductImageProps>;
  name: string;
  price: string;
  id: string;
  onClickCart: (event: React.MouseEvent<HTMLElement>) => void;
}

const Product: VFC<IProductProps> = ({
  Image,
  name,
  price,
  id,
  onClickCart,
}) => (
  <Container>
    <Link to={`/products/${id}`}>
      {Image}
      <div>
        <Desc>
          <Name>{name}</Name>
          <Price>{price} 원</Price>
        </Desc>
      </div>
    </Link>
    <CartButton onClick={onClickCart}>
      <Icon.Cart size={SIZE.ICON.CART.SM} color={COLOR.GRAY_600} />
    </CartButton>
  </Container>
);

export default Product;
export { IProductProps };
