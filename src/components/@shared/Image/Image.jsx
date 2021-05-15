import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import * as S from "./Image.styled";

import noImage from "./no_image.png";

const Image = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef(null);

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  const handleImageLoadError = () => {
    if (src !== "") ref.current.src = noImage;
  };

  return (
    <S.Image
      src={src}
      alt={alt}
      ref={ref}
      onLoad={handleImageLoaded}
      onError={handleImageLoadError}
      isLoading={isLoading}
    />
  );
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

Image.defaultProps = {
  src: "",
  alt: "",
};

export default Image;
