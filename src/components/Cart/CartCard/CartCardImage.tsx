import { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import Spinner from "../Spinner/Spinner";

type ImageStatus = "loading" | "loaded" | "error";

export default function CartCardImage({ imageUrl }: { imageUrl: string }) {
  const [imageStatus, setImageStatus] = useState<ImageStatus>("loading");
  const [finalImageUrl, setFinalImageUrl] = useState<string>(imageUrl);

  const basePath = useMemo(() => {
    const isGitHubPages = window.location.hostname.includes("github.io");
    return isGitHubPages ? "/react-shopping-carts/" : "";
  }, []);

  const isValidImageUrl = (url: string | null): boolean => {
    if (!url) return false;
    return url.startsWith("http://") || url.startsWith("https://");
  };

  const fallbackImagePath = `${basePath}fallback_image.png`;

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
    return <StyledImage src={fallbackImagePath} alt="Fallback Image" />;
  }
  return <StyledImage src={finalImageUrl} alt="Product Image" />;
}
export const StyledImage = styled.img`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  display: block;
`;
