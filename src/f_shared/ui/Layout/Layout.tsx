import classNames from 'classnames/bind';
import { ReactNode } from 'react';

import css from './Layout.module.css';

const cn = classNames.bind(css);

interface LayoutProps {
  headerSlot?: ReactNode;
  contentHeaderSlot?: ReactNode;
  contentBodySlot: ReactNode;
  contentFooterSlot?: ReactNode;
  footerSlot?: ReactNode;
}

export const Layout = ({
  headerSlot,
  contentHeaderSlot,
  contentBodySlot,
  contentFooterSlot,
  footerSlot,
}: LayoutProps) => {
  return (
    <div className={cn('root')}>
      {headerSlot && <header className={cn('header')}>{headerSlot}</header>}
      {contentHeaderSlot && <header className={cn('contentHeader')}>{contentHeaderSlot}</header>}
      <div className={cn('contentBody')}>{contentBodySlot}</div>
      {contentFooterSlot && <footer className={cn('contentFooter')}>{contentFooterSlot}</footer>}
      {footerSlot && <footer className={cn('footer')}>{footerSlot}</footer>}
    </div>
  );
};
