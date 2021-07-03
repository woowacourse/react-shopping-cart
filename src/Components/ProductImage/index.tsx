import React, { HTMLAttributes } from "react";

import { Container, ImageProps, Background } from "./style";

interface ProductImageProps extends HTMLAttributes<HTMLElement>, ImageProps {}

const ProductImage = ({ size, src, ...props }: ProductImageProps) => (
  <Container size={size} src={src} {...props}>
    <Background />
  </Container>
);

export default ProductImage;
export { ProductImageProps };
