import React, { VFC, ImgHTMLAttributes } from "react";

import { Container, Img, IImageProps, Background } from "./style";

interface IProductImageProps extends ImgHTMLAttributes<HTMLImageElement>, IImageProps {}

// TODO: 이미지 비율에 맞게 중앙 배치
const ProductImage: VFC<IProductImageProps> = ({ size, ...props }) => (
  <Container size={size}>
    <Img size={size} {...props} />
    <Background />
  </Container>
);

export default ProductImage;
export { IProductImageProps };
