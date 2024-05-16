import classNames from 'classnames/bind';
import { ReactNode } from 'react';
import { Outlet } from 'react-router';

import css from './Layout.module.css';

const cn = classNames.bind(css);

interface LayoutProps {
  headerSlot?: ReactNode;
  footerSlot?: ReactNode;
  fixHeader?: boolean;
  fixFooter?: boolean;
}

export const Layout = ({ headerSlot, footerSlot, fixHeader = false, fixFooter = false }: LayoutProps) => {
  return (
    <div className={cn('root')}>
      {headerSlot && <header className={cn('header', { fixHeader })}>{headerSlot}</header>}
      <div className={cn('content')}>
        <Outlet />
      </div>
      {footerSlot && <footer className={cn('footer', { fixFooter })}>{footerSlot}</footer>}
    </div>
  );
};
