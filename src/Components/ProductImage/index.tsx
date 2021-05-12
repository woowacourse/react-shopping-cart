import React, { VFC, ImgHTMLAttributes } from "react";

import { Container, Img, IImageProps, Background } from "./style";

interface IProductImageProps extends ImgHTMLAttributes<HTMLImageElement>, IImageProps {}

const ProductImage: VFC<IProductImageProps> = ({ size, ...props }) => (
  <Container size={size}>
    <Img size={size} {...props} />
    <Background />
  </Container>
);

export default ProductImage;
export { IProductImageProps };
