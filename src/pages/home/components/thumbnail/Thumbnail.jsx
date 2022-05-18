import { useState } from "react";
import ThumbnailLoadingIndicator from "../thumbnail-loading-indicator/ThumbnailLoadingIndicator";
import styles from "./thumbnail.module.scss";

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
