import { memo, ImgHTMLAttributes } from "react";
import Styled from "./ProductImgStyled";

const ProductImg = ({ ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
  return <Styled.Img loading="lazy" {...props} />;
};

export default memo(ProductImg);
