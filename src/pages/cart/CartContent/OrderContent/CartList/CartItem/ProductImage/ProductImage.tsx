import * as S from "./ProductImage.styled";
import DefaultItemIcon from "@assets/icons/default-item.svg";
import { SyntheticEvent } from "react";

interface ProductImageProps {
  imageUrl: string;
  name: string;
}

export default function ProductImage({ imageUrl, name }: ProductImageProps) {
  const imageLoadError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    target.src = DefaultItemIcon;
  };

  return (
    <S.Image
      src={imageUrl ?? DefaultItemIcon}
      alt={`${name} 상품`}
      onError={imageLoadError}
    />
  );
}
