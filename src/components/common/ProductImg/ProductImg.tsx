import { memo, ImgHTMLAttributes } from "react";
import empty from "../../../assets/img/empty.jpg";
import Styled from "./ProductImgStyled";

const ProductImg = ({ src, ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
  if (!src) src = empty;
  return <Styled.Img loading="lazy" src={src} {...props} />;
};

export default memo(ProductImg);
