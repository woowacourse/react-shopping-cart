import { useState } from "react";
import styles from "./loading-thumbnail.module";

const cn = require("classnames");

function LoadingThumbnail({ className, src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={cn(styles.thumbnail, className)}>
      {!isLoaded && <ThumbnailLoadingIndicator />}
      <img
        src={src}
        alt={alt || "상품 이미지"}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}

function ThumbnailLoadingIndicator() {
  return (
    <div className={cn(styles.indicatorWrapper)}>
      <div className={cn(styles.indicator)} />
    </div>
  );
}

export default LoadingThumbnail;
