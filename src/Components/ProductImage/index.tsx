import React, { VFC, ImgHTMLAttributes } from "react";

import { Container, IContainerProps } from "./style";

interface IProductImageProps
  extends ImgHTMLAttributes<HTMLImageElement>,
    IContainerProps {}

// TODO: 이미지 비율에 맞게 중앙 배치
const ProductImage: VFC<IProductImageProps> = ({ size, ...props }) => (
  <Container size={size}>
    <img width={size} {...props} />
  </Container>
);

export default ProductImage;
export { IProductImageProps };
