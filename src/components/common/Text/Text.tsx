import { HTMLAttributes, PropsWithChildren } from 'react';
import styles from './Text.module.css';

export default function Text({ children }: PropsWithChildren) {
  return <>{children}</>;
}

Text.Title = function Title({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) {
  return (
    <span className={`${styles.titleText} ${className}`} {...props}>
      {children}
    </span>
  );
};

Text.Subtitle = function Subtitle({ children }: PropsWithChildren) {
  return <span className={styles.subtitleText}>{children}</span>;
};

Text.Caption = function Caption({ children }: PropsWithChildren) {
  return <span className={styles.captionText}>{children}</span>;
};

Text.Label = function Label({ children }: PropsWithChildren) {
  return <span className={styles.labelText}>{children}</span>;
};

Text.SubtitleSpaceBetween = function SubtitleSpaceBetween({
  subtitle,
  content,
}: {
  subtitle: string;
  content: string;
}) {
  return (
    <div className={styles.subtitleSpaceBetweenContainer}>
      <Text.Subtitle>{subtitle}</Text.Subtitle>
      <Text.Title>{content}</Text.Title>
    </div>
  );
};

Text.TitleWithCaption = function TitleWithCaption({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  return (
    <div className={styles.titleContainer}>
      <Text.Title className={styles.marginBottom}>{title}</Text.Title>
      {children}
    </div>
  );
};
