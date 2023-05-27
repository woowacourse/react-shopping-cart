import { memo, ImgHTMLAttributes } from "react";
import empty from "../../assets/img/empty.jpg";
import Styled from "./ProductImgStyled";

interface ProductImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  theme: object;
}

const ProductImg = ({ src, theme, ...props }: ProductImgProps) => {
  if (!src) src = empty;
  return <Styled.Img theme={theme} src={src} loading="lazy" {...props} />;
};

export default memo(ProductImg);
