import { Text } from '@/f_shared';

import css from './ContentHeader.module.css';

interface ContentHeaderProps {
  title: string;
  desc?: string;
}

export const ContentHeader = ({ title, desc }: ContentHeaderProps) => {
  return (
    <div className={css.root}>
      <Text type={'h1'}>{title}</Text>
      {desc && (
        <Text type={'b2'} tag={'pre'} className={css.desc}>
          {desc}
        </Text>
      )}
    </div>
  );
};
