import classNames from 'classnames/bind';
import { ReactNode } from 'react';

import css from './Layout.module.css';

const cn = classNames.bind(css);

interface Gap {
  top?: number;
  bottom?: number;
}

interface LayoutProps {
  headerSlot?: ReactNode;
  contentHeaderSlot?: ReactNode;
  contentBodySlot: ReactNode;
  contentFooterSlot?: ReactNode;
  footerSlot?: ReactNode;

  gap?: Gap;
  bgColor?: string;
}

export const Layout = ({
  headerSlot,
  contentHeaderSlot,
  contentBodySlot,
  contentFooterSlot,
  footerSlot,

  gap,
  bgColor = 'white',
}: LayoutProps) => {
  return (
    <div style={{ backgroundColor: bgColor }} className={cn('root')}>
      {headerSlot && <header className={cn('header')}>{headerSlot}</header>}
      <div className={cn('content')}>
        {contentHeaderSlot && <header className={cn('contentHeader')}>{contentHeaderSlot}</header>}
        <div style={{ margin: `${gap?.top ?? 0}px 0 ${gap?.bottom ?? 0}px 0` }} className={cn('contentBody')}>
          {contentBodySlot}
        </div>
        {contentFooterSlot && <footer className={cn('contentFooter')}>{contentFooterSlot}</footer>}
      </div>
      {footerSlot && <footer className={cn('footer')}>{footerSlot}</footer>}
    </div>
  );
};
