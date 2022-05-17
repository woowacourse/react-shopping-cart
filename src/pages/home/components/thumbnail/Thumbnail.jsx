import { useState } from "react";
import styles from "./thumbnail.module.scss";

const cn = require("classnames");

function Thumbnail({ className, src }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={cn("thumbnail", styles.thumbnail, className)}>
      {!isLoaded && (
        <div className={cn("indicator", styles.indicator)}>isLoading</div>
      )}
      <img src={src} alt="상품 이미지" onLoad={() => setIsLoaded(true)} />
    </div>
  );
}

export default Thumbnail;
