import styles from "@home/components/thumbnail-loading-indicator/thumbnail-loading-indicator.module";

const cn = require("classnames");

function ThumbnailLoadingIndicator() {
  return (
    <div className={cn(styles.indicatorWrapper)}>
      <div className={cn(styles.indicator)} />
    </div>
  );
}

export default ThumbnailLoadingIndicator;
