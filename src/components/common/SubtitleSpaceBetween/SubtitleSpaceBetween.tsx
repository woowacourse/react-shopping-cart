import common from '../../../styles/common.module.css';
import styles from './SubtitleSpaceBetween.module.css';

interface Props {
  subtitle: string;
  content: string;
}

export default function SubtitleSpaceBetween({ subtitle, content }: Props) {
  return (
    <div className={styles.subtitleSpaceBetweenContainer}>
      <span className={common.subtitleText}>{subtitle}</span>
      <span className={common.titleText}>{content}</span>
    </div>
  );
}
