import React, { FC, ImgHTMLAttributes } from "react";

import { Container, Img, ImageProps, Background } from "./style";

interface ProductImageProps extends ImgHTMLAttributes<HTMLImageElement>, ImageProps {}

const ProductImage: FC<ProductImageProps> = ({ size, ...props }) => (
  <Container size={size}>
    <Img size={size} {...props} />
    <Background />
  </Container>
);

export default ProductImage;
export { ProductImageProps };
