import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Spinner from "./Spinner";
import fallbackPng from "/fallback_image.png";

type ImageStatus = "loading" | "loaded" | "error";

interface CustomImageProps {
  imageUrl: string;
  alt: string;
  width?: number;
  height?: number;
}
export default function CustomImage({
  imageUrl,
  alt,
  width = 80,
  height = 80,
}: CustomImageProps) {
  const [imageStatus, setImageStatus] = useState<ImageStatus>("loading");
  const [finalImageUrl, setFinalImageUrl] = useState<string>(imageUrl);
  const isValidImageUrl = (url: string | null): boolean => {
    if (!url) return false;
    return url.startsWith("http://") || url.startsWith("https://");
  };

  const fallbackImagePath = fallbackPng;

  useEffect(() => {
    if (!isValidImageUrl(imageUrl)) {
      setImageStatus("error");
      setFinalImageUrl(fallbackImagePath);
      return;
    }
    if (typeof window === "undefined") return;
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      setImageStatus("loaded");
      setFinalImageUrl(imageUrl);
    };
    img.onerror = () => {
      setImageStatus("error");
      setFinalImageUrl(fallbackImagePath);
    };
  }, [imageUrl, fallbackImagePath]);

  if (imageStatus === "loading") {
    return <Spinner size="small" />;
  }
  if (imageStatus === "error") {
    return (
      <StyledImage
        src={fallbackImagePath}
        alt="Fallback Image"
        width={width}
        height={height}
      />
    );
  }
  return (
    <StyledImage src={finalImageUrl} alt={alt} width={width} height={height} />
  );
}
const StyledImage = styled.img<{ width: number; height: number }>`
  position: relative;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 8px;
  display: block;
`;
