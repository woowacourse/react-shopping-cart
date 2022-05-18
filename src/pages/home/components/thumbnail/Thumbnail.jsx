import { useState } from "react";
import ThumbnailLoadingIndicator from "@home/components/thumbnail-loading-indicator/ThumbnailLoadingIndicator";
import styles from "@home/components/thumbnail/thumbnail.module";

const cn = require("classnames");

function Thumbnail({ className, src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={cn("thumbnail", styles.thumbnail, className)}>
      {!isLoaded && <ThumbnailLoadingIndicator />}
      <img
        src={src}
        alt={alt || "상품 이미지"}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}

export default Thumbnail;
