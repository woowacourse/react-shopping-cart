import { useState } from 'react';
import noImageUrl from '../assets/images/no_image.jpg';

const useImageFallback = (
  defaultImageUrl = noImageUrl
): {
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  onImageLoadError: () => void;
} => {
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);

  const onImageLoadError = () => {
    setImageUrl(noImageUrl);
  };

  return { imageUrl, setImageUrl, onImageLoadError };
};

export default useImageFallback;
