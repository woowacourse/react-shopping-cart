import { useState } from "react";
import noImage from "./no_image.png";

// eslint-disable-next-line import/prefer-default-export
export const useThumbnail = (defaultImage) => {
  const [thumbnail, setThumbnail] = useState(defaultImage);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  const handleImageLoadError = () => {
    setThumbnail(noImage);
  };

  return {
    src: thumbnail,
    isLoading,
    onLoad: handleImageLoaded,
    onError: handleImageLoadError,
  };
};
