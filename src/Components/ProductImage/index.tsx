import React, { FC } from "react";

import { ImageContainer } from "./style";

interface IProductImageProps extends React.HTMLAttributes<HTMLImageElement> {
  size: string;
}

// TODO: 이미지 비율에 맞게 중앙 배치
const ProductImage: FC<IProductImageProps> = ({ size, ...props }) => (
  <ImageContainer size={size}>
    <img {...props} />
  </ImageContainer>
);

export default ProductImage;
export { IProductImageProps };
