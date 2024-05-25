import { PropsWithChildren } from 'react';
import common from '../../../styles/common.module.css';

export default function SubtitleText({ children }: PropsWithChildren) {
  return <span className={common.subtitleText}>{children}</span>;
}
