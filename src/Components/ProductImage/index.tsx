import React, { FC, HTMLAttributes } from "react";

import { Container, ImageProps, Background } from "./style";

interface ProductImageProps extends HTMLAttributes<HTMLElement>, ImageProps {}

const ProductImage: FC<ProductImageProps> = ({ size, src, ...props }) => (
  <Container size={size} src={src} {...props}>
    <Background />
  </Container>
);

export default ProductImage;
export { ProductImageProps };
