import styles from "@home/components/thumbnail-loading-indicator/thumbnail-loading-indicator.module";

const cn = require("classnames");

function ThumbnailLoadingIndicator() {
  return (
    <div className={cn("indicatorWrapper", styles.indicatorWrapper)}>
      <div className={cn("indicator", styles.indicator)} />
    </div>
  );
}

export default ThumbnailLoadingIndicator;
