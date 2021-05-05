import React, { VFC, ImgHTMLAttributes } from "react";

import { ImageContainer, IImageContainerProps } from "./style";

interface IProductImageProps
  extends ImgHTMLAttributes<HTMLImageElement>,
    IImageContainerProps {}

// TODO: 이미지 비율에 맞게 중앙 배치
const ProductImage: VFC<IProductImageProps> = ({ size, ...props }) => (
  <ImageContainer size={size}>
    <img {...props} />
  </ImageContainer>
);

export default ProductImage;
export { IProductImageProps };
