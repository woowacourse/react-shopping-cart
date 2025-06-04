import styled from "@emotion/styled";
import { ImgHTMLAttributes, useState } from "react";

interface ImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "onError"> {
  src: string;
  altText?: string;
  isSoldOut?: boolean;
  width?: string;
  height?: string;
  position?: "absolute" | "relative" | "static" | "fixed" | "sticky";
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

function Image({
  src,
  altText = "이미지",
  isSoldOut = false,
  onError,
  ...props
}: ImageProps) {
  const [imageUrl, setImageUrl] = useState(src);

  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    setImageUrl("./assets/images/DefaultImage.jpg");
    if (onError) {
      onError(event);
    }
  };

  return (
    <ImageContainer
      src={imageUrl}
      alt={altText}
      isSoldout={isSoldOut}
      onError={handleError}
      {...props}
    />
  );
}

const ImageContainer = styled.img<{
  isSoldout: boolean;
  width?: string;
  height?: string;
  position?: "absolute" | "relative" | "static" | "fixed" | "sticky";
}>`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};
  object-fit: cover;
  ${({ isSoldout }) => isSoldout && `filter: grayscale(100%) brightness(0.5);`}
  ${({ position }) => position && `position: ${position};`}
`;

export default Image;
