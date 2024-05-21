import classNames from 'classnames/bind';
import { ReactNode } from 'react';

import css from './Layout.module.css';

const cn = classNames.bind(css);

interface LayoutProps {
  fixedHeaderSlot?: ReactNode;
  headerSlot?: ReactNode;
  contentSlot: ReactNode;
  footerSlot?: ReactNode;
  fixedFooterSlot?: ReactNode;
}

export const Layout = ({ fixedHeaderSlot, headerSlot, contentSlot, footerSlot, fixedFooterSlot }: LayoutProps) => {
  return (
    <div className={cn('root')}>
      {fixedHeaderSlot && <header className={cn('fixedHeader')}>{fixedHeaderSlot}</header>}
      {headerSlot && <header className={cn('header')}>{headerSlot}</header>}
      <div className={cn('content')}>{contentSlot}</div>
      {footerSlot && <footer className={cn('footer')}>{footerSlot}</footer>}
      {fixedFooterSlot && <footer className={cn('fixedFooter')}>{fixedFooterSlot}</footer>}
    </div>
  );
};
