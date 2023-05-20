import { Header } from '../Header';

import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

export const Layout = ({ children }: PropsWithChildren) => (
  <Style.Layout>
    <Header />
    <div style={{ width: '1320px' }}>{children}</div>
  </Style.Layout>
);

const Style = {
  Layout: styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;
  `,
};
