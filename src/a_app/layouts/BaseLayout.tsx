import { Outlet } from 'react-router';

import css from './BaseLayout.module.css';

export const baseLayout = (
  <div className={css.root}>
    <Outlet />
  </div>
);
